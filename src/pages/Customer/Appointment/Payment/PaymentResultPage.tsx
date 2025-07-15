import { useEffect, useState } from "react"
import { PayOSResponseCard } from "./PayOS"
import { PayOSResponse } from "@/types/payment"

interface PaymentResultPageProps {
  paymentData: PayOSResponse;
  deadline: number;
  onCancelSuccess: () => void;
  onTimerEnd: () => void;
}

export default function PaymentResultPage({ 
  paymentData, 
  deadline, 
  onCancelSuccess,
  onTimerEnd
}: PaymentResultPageProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let hasExpired = false;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((deadline - now) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0 && !hasExpired) {
        hasExpired = true;
        onTimerEnd(); 
      }
    };

    

    updateTimer(); // Run immediately
    const interval = setInterval(updateTimer, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, [deadline, onTimerEnd]);

  return (
    <div>
      {!paymentData ? (
        <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-300">Loading payment details...</p>
      ) : (
        <PayOSResponseCard 
          data={paymentData} 
          timeLeft={timeLeft} 
          onCancelSuccess={onCancelSuccess}
         />
      )}
    </div>
  )
}