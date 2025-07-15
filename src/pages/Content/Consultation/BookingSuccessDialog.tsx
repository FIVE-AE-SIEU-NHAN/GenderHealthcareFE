import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface BookingSuccessDialogProps {
  bookingDetails: {
    topic: string;
    date: string;
    time: string;
  };
  onClose: () => void;
}

export function BookingSuccessDialog({ bookingDetails, onClose }: BookingSuccessDialogProps) {
  const navigate = useNavigate(); 

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCloseAndNavigate = () => {
    // If a timer is running, clear it to prevent it from firing again.
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onClose(); // Close the dialog (removes it from the DOM)
    navigate('/user/appointments'); 
  };

  // --- Timeout when the component mounts ---
  useEffect(() => {
    // Start the timer when the dialog appears.
    timerRef.current = setTimeout(() => {
      handleCloseAndNavigate(); 
    }, 10000); // 10 secs

    // Run when the component unmounts (onClose is called).
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); 


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full relative text-black m-4">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={handleCloseAndNavigate}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="bg-green-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
            <BsCheckCircleFill className="text-green-500 text-5xl" />
          </div>
          <h3 className="text-2xl font-bold text-green-600">Consultation Booked Successfully!</h3>
          <p className="text-gray-500 mt-1">Thank you for trusting us.</p>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6">
          <h4 className="font-bold text-[#1A3973] mb-3 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Appointment Details
          </h4>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{bookingDetails.topic}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{bookingDetails.date}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{bookingDetails.time}</span>
            </p>
          </div>
        </div>

        <p className="text-gray-600 text-sm text-center mb-6">
          We will contact you to confirm your appointment. Please keep your phone available.
        </p>

        <Button
          className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] hover:from-[#15305f]
                    hover:to-[#3a6ad0] text-white text-lg font-semibold rounded-lg py-3 
                    shadow-lg hover:shadow-xl transition-all duration-300 
                    relative overflow-hidden group cursor-pointer"
          onClick={handleCloseAndNavigate}
        >
          <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full 
                          group-hover:translate-x-full transition-transform duration-700"></span>
          <div className="relative flex items-center justify-center">Got it</div>
        </Button>
      </div>
    </div>
  );
}