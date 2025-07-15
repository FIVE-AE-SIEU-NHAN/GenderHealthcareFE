// PaymentResultPay.tsx
import { useEffect, useState } from "react"
// import axios from "axios"
import { PayOSResponseCard } from "./PayOS"
import { PayOSResponse } from "@/types/payment"

interface PaymentResultPageProps {
  paymentData: PayOSResponse;
}

const DEADLINE_KEY = "payos_deadline";

export default function PaymentResultPage({ paymentData }: PaymentResultPageProps) {
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    // If there's no payment data, don't start a timer.
    if (!paymentData) return;

    // Create a new deadline for this specific payment session.
    const deadline = Date.now() + 15 * 60 * 1000; // 15 mins
    localStorage.setItem(DEADLINE_KEY, deadline.toString());

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((deadline - now) / 1000));
      setTimeLeft(remaining);

      // Clear localStorage if timer hits zero to allow a new timer next time
      if (remaining === 0) {
        localStorage.removeItem(DEADLINE_KEY);
      }
    };

    updateTimer(); // Run immediately
    const interval = setInterval(updateTimer, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, [paymentData]);

  return (
    <div>
      {!paymentData ? (
        <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-300">Loading payment details...</p>
      ) : (
        <PayOSResponseCard data={paymentData} timeLeft={timeLeft} />
      )}
    </div>
  )
}