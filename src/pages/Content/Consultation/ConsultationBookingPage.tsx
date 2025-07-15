import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";

import { useAppointmentMutations } from "@/hooks/customer/useAppointmentMutations";
import { timeSlotOptions, TOPIC_OPTIONS } from "@/Application/constants/appointment";
import PaymentResultPage from "@/pages/Customer/Appointment/Payment/PaymentResultPage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PayOSResponse } from "@/types/payment";
import { BookAppointmentResponse } from "@/types/customer/appointmentTypes";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useSocket } from "@/contexts/SocketContext";
import { BookingSuccessDialog } from "@/pages/Customer/Appointment/BookingSuccessDialog";
import { AppointmentForm, formSchema } from "./ConsultationBookingForm";

const ConsultantAppointmentPage = () => {
  const { bookAppointment } = useAppointmentMutations();
  const socket = useSocket();

  const [bookingDetails, setBookingDetails] = useState({ topic: "", date: "", time: "" });
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<PayOSResponse | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      booking_date: undefined,
      time_slot: "",
      agreed: false,
    }
  });

  useEffect(() => {
    const handlePaymentStatus = (paymentUpdate: { status: string; content: string }) => {
      console.log('Received payment status update in parent:', paymentUpdate);

      // Check for the success status from BE
      if (paymentUpdate.status === 'SUCCESS') {
        toast.success(paymentUpdate.content || 'Payment confirmed successfully!');

        setPaymentDialogOpen(false);
        setSuccessDialogOpen(true);
      } else if (paymentUpdate.status === 'FAILED') {
        toast.error(paymentUpdate.content || 'Payment failed.');
      }
    };

    socket.on('payment:status', handlePaymentStatus);

    return () => {
      socket.off('payment:status', handlePaymentStatus);
    };
  }, [socket]);




  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedDate = format(values.booking_date, "yyyy-MM-dd");
    const payload = {
      topic: values.topic,
      booking_date: formattedDate,
      time_slot: values.time_slot,
    };

    bookAppointment.mutate(payload, {
      onSuccess: (data: BookAppointmentResponse) => {
        setPaymentData(data.result);

        const topicLabel = TOPIC_OPTIONS.find(t => t.value === values.topic)?.label || "";
        const timeLabel = timeSlotOptions.find(t => t.value === values.time_slot)?.label || "";
        const displayDate = format(values.booking_date, "dd/MM/yyyy");

        setBookingDetails({
          topic: topicLabel,
          date: displayDate,
          time: timeLabel
        });

        setPaymentDialogOpen(true);
        form.reset();
      },
    });
  }

  return (
    <div
      className="flex items-center justify-center max-[1125px]:min-h-[90vh] min-[1125px]:min-h-[93vh] 
                  relative bg-blend-overlay bg-cover bg-center bg-no-repeat 
                  bg-[url('https://benhviengreen.com/wp-content/uploads/2016/05/doctor-health-wellness-1200x480.jpg')]"
    >
      <div className="absolute inset-0 bg-white/40 z-0 backdrop-blur-sm"></div>
      {/* Form */}
      <AppointmentForm
        onSubmit={onSubmit}
        isPending={bookAppointment.isPending}
        form={form}
      />

      {/* Success notification + Form info */}
      <Dialog
        open={isPaymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
      >

        <DialogContent
          className="p-0 bg-transparent border-none shadow-none md:min-w-4xl h-[calc(95vh)] md:h-auto md overflow-y-auto"
          onInteractOutside={(e) => {
            // Prevent closing on outside click
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            // prevent closing on ESC key
            e.preventDefault();
          }}
        >
          <DialogTitle className="sr-only">Payment Result</DialogTitle>
          {/* Render the payment page only when data is available */}
          {paymentData && (
            <PaymentResultPage paymentData={paymentData} />
          )}
        </DialogContent>
      </Dialog>

      {/* Renders the Success Dialog */}
      {isSuccessDialogOpen && (
        <BookingSuccessDialog
          bookingDetails={bookingDetails}
          onClose={() => setSuccessDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ConsultantAppointmentPage;