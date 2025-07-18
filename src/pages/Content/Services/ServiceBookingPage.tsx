import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";

import { timeSlotOptions } from "@/Application/constants/appointment";
import PaymentResultPage from "@/pages/Customer/Appointment/Payment/PaymentResultPage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PayOSResponse } from "@/types/payment";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useSocket } from "@/contexts/SocketContext";
import { BookingSuccessDialog } from "@/pages/Content/Consultation/BookingSuccessDialog";
import { BookingFailedDialog } from "@/pages/Content/Consultation/BookingFailedDialog";
import { useAppointmentMutations } from "@/hooks/customer/useAppointmentMutations";
import { formSchema, ServicesBookingForm, STIS_TESTING_PACKAGES } from "./ServiceBookingForm";
import { BookAppointmentResponse } from "@/types/customer/appointmentTypes";

const PAYMENT_DATA_KEY = "payment_session_data";
const PAYMENT_DEADLINE_KEY = "payment_session_deadline";

const ServiceBookingPage = () => {
  const { bookService } = useAppointmentMutations();
  const socket = useSocket();

  const [bookingDetails, setBookingDetails] = useState({ topic: "", date: "", time: "" });
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isFailedDialogOpen, setFailedDialogOpen] = useState(false);
  const [failureReason, setFailureReason] = useState("");

  const [paymentData, setPaymentData] = useState<PayOSResponse | null>(null);
  const [paymentDeadline, setPaymentDeadline] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      booking_date: undefined,
      time_slot: "",
      note: "",
      agreed: false,
    }
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem(PAYMENT_DATA_KEY);
    const storedDeadline = sessionStorage.getItem(PAYMENT_DEADLINE_KEY);

    if (storedData && storedDeadline) {
      const deadline = parseInt(storedDeadline, 10);
      if (Date.now() < deadline) {
        setPaymentData(JSON.parse(storedData));
        setPaymentDeadline(deadline);
        setPaymentDialogOpen(true);
      } else {
        sessionStorage.removeItem(PAYMENT_DATA_KEY);
        sessionStorage.removeItem(PAYMENT_DEADLINE_KEY);
      }
    }
  }, []);

  const clearPaymentSession = () => {
    sessionStorage.removeItem(PAYMENT_DATA_KEY);
    sessionStorage.removeItem(PAYMENT_DEADLINE_KEY);
    setPaymentData(null);
  };

  useEffect(() => {
    const handlePaymentStatus = (paymentUpdate: { status: string; content: string }) => {
      if (paymentUpdate.status === 'SUCCESS') {
        toast.success(paymentUpdate.content || 'Payment confirmed successfully!');
        clearPaymentSession();
        setPaymentDialogOpen(false);
        setSuccessDialogOpen(true);
      } else if (paymentUpdate.status === 'FAILED') {
        if (isPaymentDialogOpen) {
          clearPaymentSession();
          setPaymentDialogOpen(false);
          setFailureReason(paymentUpdate.content || "Payment failed or was canceled.");
          setFailedDialogOpen(true);
        }
      }
    };
    socket.on('payment:status', handlePaymentStatus);
    return () => {
      socket.off('payment:status', handlePaymentStatus);
    };
  }, [socket, isPaymentDialogOpen]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedPackage = STIS_TESTING_PACKAGES.find(p => p.value === values.topic);

    if (!selectedPackage) {
      toast.error("Invalid package selected. Please try again.");
      return;
    }

    const formattedDate = format(values.booking_date, "yyyy-MM-dd");

    // Construct the new payload for the backend
    const payload = {
      booking_date: formattedDate,
      time_slot: values.time_slot,
      target_gender: selectedPackage.gender,
      level: selectedPackage.level,
      note: values.note,
    };

    bookService.mutate(payload, {
      onSuccess: (data: BookAppointmentResponse) => {
        const newDeadline = Date.now() + 1 * 30 * 1000; // 10 minutes
        sessionStorage.setItem(PAYMENT_DATA_KEY, JSON.stringify(data.result));
        sessionStorage.setItem(PAYMENT_DEADLINE_KEY, newDeadline.toString());

        const timeLabel = timeSlotOptions.find(t => t.value === values.time_slot)?.label || "";
        const displayDate = format(values.booking_date, "dd/MM/yyyy");

        setBookingDetails({
          topic: selectedPackage.label,
          date: displayDate,
          time: timeLabel
        });

        setPaymentData(data.result);
        setPaymentDeadline(newDeadline);
        setPaymentDialogOpen(true);
        form.reset();
      },
    });
  }

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      clearPaymentSession();
    }
    setPaymentDialogOpen(isOpen);
  };

  const handleTimerEnd = () => {
    clearPaymentSession();
    setPaymentDialogOpen(false);
    setFailureReason("Your payment session has expired. Please try booking again.");
    setFailedDialogOpen(true);
  };

  return (
    <div
      className="flex items-center justify-center max-[1125px]:min-h-[90vh] min-[1125px]:min-h-[93vh]
                  relative bg-blend-overlay bg-cover bg-center bg-no-repeat
                  bg-[url('https://benhviengreen.com/wp-content/uploads/2016/05/doctor-health-wellness-1200x480.jpg')]"
    >
      <div className="absolute inset-0 bg-white/40 z-0 backdrop-blur-sm"></div>
      <ServicesBookingForm
        onSubmit={onSubmit}
        isPending={bookService.isPending}
        form={form}
      />

      <Dialog
        open={isPaymentDialogOpen}
        onOpenChange={handleDialogChange}
      >
        <DialogContent
          className="[&>button:first-of-type]:hidden p-0 bg-transparent border-none shadow-none md:min-w-4xl h-[calc(95vh)] md:h-auto md overflow-y-auto"
          onInteractOutside={(e) => { e.preventDefault(); }}
          onEscapeKeyDown={(e) => { e.preventDefault(); }}
        >
          <DialogTitle className="sr-only">Payment Result</DialogTitle>
          {paymentData && (
            <PaymentResultPage
              paymentData={paymentData}
              deadline={paymentDeadline}
              onCancelSuccess={clearPaymentSession}
              onTimerEnd={handleTimerEnd}
            />
          )}
        </DialogContent>
      </Dialog>

      {isSuccessDialogOpen && (
        <BookingSuccessDialog
          bookingDetails={bookingDetails}
          onClose={() => setSuccessDialogOpen(false)}
        />
      )}

      {isFailedDialogOpen && (
        <BookingFailedDialog
          errorMessage={failureReason}
          onClose={() => setFailedDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ServiceBookingPage;