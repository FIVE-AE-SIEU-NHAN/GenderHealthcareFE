// PaymentResultPay.tsx
import { useEffect, useState } from "react"
// import axios from "axios"
import { PayOSResponseCard } from "./PayOS"
import { PayOSResponse } from "@/types/payment"


const DEADLINE_KEY = "payos_deadline";

export default function PaymentResultPage() {
  const [timeLeft, setTimeLeft] = useState(0);
  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   async function fetchPayment() {
  //     try {
  //       const res = await axios.post("https://996b7361ac3d.ngrok-free.app/test") 
  //       setData(res.data)
  //     } catch (error) {
  //       console.error("Failed to fetch payment data:", error)
  //     }
  //   }
  //   fetchPayment()
  // }, [])


  const [data, setData] = useState<PayOSResponse | null>(null)

  const mockData: PayOSResponse = {
    "bin": "970416",
    "accountNumber": "LOCCASS000332340",
    "accountName": "MAI NHAN KIET",
    "amount": 5000,
    "description": "CSITUEJGCB3 PAYMENT FOR CONSULTATION",
    "orderCode": 680028,
    "currency": "VND",
    "paymentLinkId": "0b191016f24a4349aaa7f0e324155cdc",
    "status": "PENDING",
    "checkoutUrl": "https://pay.payos.vn/web/0b191016f24a4349aaa7f0e324155cdc",
    "qrCode": "00020101021238600010A000000727013000069704160116LOCCASS0003323400208QRIBFTTA5303704540450005802VN62400836CSITUEJGCB3 PAYMENT FOR CONSULTATION6304BD60"
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData)
    }, 200)

    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    let deadline: number;

    const stored = localStorage.getItem(DEADLINE_KEY);
    if (stored) {
      deadline = parseInt(stored);
    } else {
      deadline = Date.now() + 5 * 60 * 1000; // 15 minutes
      localStorage.setItem(DEADLINE_KEY, deadline.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((deadline - now) / 1000)); // in seconds
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
      {!data ? (
        <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-300">Loading payment details...</p>
      ) : (
        <PayOSResponseCard data={data} timeLeft={timeLeft} />
      )}
    </div>
  )
}