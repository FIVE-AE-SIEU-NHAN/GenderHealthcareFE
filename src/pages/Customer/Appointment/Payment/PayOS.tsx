import { Button } from "@/components/ui/button";
import { PayOSResponse } from "@/types/payment";
import { Copy, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { usePaymentMutations } from "@/hooks/payment/usePaymentMutations";

export function PayOSResponseCard({ data, timeLeft }: { data: PayOSResponse; timeLeft: number }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { cancelPayment } = usePaymentMutations();
  const navigate = useNavigate();

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const infoRows = [
    { id: "accountName", label: "Account Holder", value: data.accountName },
    { id: "accountNumber", label: "Account Number", value: data.accountNumber, isMono: true },
    { id: "description", label: "Transfer Content", value: data.description, isMono: true },
  ];

  const handleConfirmCancel = () => {
    cancelPayment.mutate({ orderCode: data.orderCode.toString() }, {
      onSuccess: () => {
        navigate("/booking-info");
      },
    });
  };



  return (
    <div className="relative mx-auto grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-3xl border border-slate-200 animate-fade-in-up">
      <div className="absolute top-6 left-6 z-10 rounded-md bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-900 shadow-sm border border-green-600">
        {data.orderCode}
      </div>

      {/* ===== QR Code and Timer ===== */}
      <div className="relative rounded-l-3xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 border-r border-slate-200">
        {/* Dotted BG */}
        <div
          className="absolute inset-0 z-0 opacity-16"
          style={{ backgroundImage: 'radial-gradient(#555 1px, transparent 1px), radial-gradient(#555 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}
        ></div>

        {/* Payment Info */}
        <div className="z-1">
          <img src="/images/ACB.webp" alt="ACB Bank" className="h-8 mb-6 mx-auto drop-shadow-sm/40" />

          <div className="w-54 h-54 bg-white rounded-2xl shadow-lg/20 border border-slate-300/80 flex items-center justify-center">
            <QRCodeSVG value={data.qrCode} size={190} />
          </div>

          <div className="mt-6">
            <p className="text-slate-500 text-sm text-shadow-lg/10">Scan the code to pay</p>
            <p className="text-4xl font-mono text-slate-800 tracking-widest mt-2 text-shadow-lg/10">{minutes}:{seconds}</p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="mt-6 px-8 py-2 text-lg text-red-600 border-red-600 bg-red-100 hover:bg-red-200 hover:text-red-700 transition-all duration-300 active:scale-95"
              >
                Cancel
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will cancel the current payment attempt and you will be returned to the homepage. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={cancelPayment.isPending}>Continue Payment</AlertDialogCancel>
                <Button
                  variant="destructive"
                  onClick={handleConfirmCancel}
                  disabled={cancelPayment.isPending}
                >
                  {cancelPayment.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Canceling...
                    </>
                  ) : (
                    "Confirm Cancel"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* ===== Payment Details ===== */}
      <div className="p-6 md:p-8 flex flex-col md:space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manual Payment</h2>
          <p className="text-slate-500">Click a row to copy the information.</p>
        </div>

        <div className="space-y-3">
          {infoRows.map(row => (
            <div
              key={row.id}
              onClick={() => handleCopy(row.value, row.id)}
              className={`group p-3 rounded-lg cursor-pointer border-2 transition-all duration-300 ${copiedField === row.id
                ? 'border-blue-400 bg-blue-50'
                : 'border-transparent hover:bg-slate-100'
                }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500 group-hover:text-blue-600 transition-colors">{row.label}</p>
                  <p className={`text-base font-semibold text-slate-700 ${row.isMono ? 'font-mono' : ''}`}>{row.value}</p>
                </div>
                <div className="w-5 h-5 text-slate-400 transition-all duration-300">
                  {copiedField === row.id
                    ? <CheckCircle className="text-blue-500" />
                    : <Copy className="opacity-0 group-hover:opacity-100" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div
            onClick={() => handleCopy(data.amount.toString(), 'amount')}
            className={`group p-3 rounded-lg cursor-pointer border-2 transition-all duration-300 ${copiedField === 'amount'
              ? 'border-blue-400 bg-blue-50'
              : 'border-transparent hover:bg-slate-100'
              }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 group-hover:text-blue-600 transition-colors">Amount</p>
                <p className="text-3xl font-bold text-blue-600 tracking-tight">{formatCurrency(data.amount)}</p>
              </div>
              <div className="w-6 h-6 text-slate-400 transition-all duration-300">
                {copiedField === 'amount'
                  ? <CheckCircle className="text-blue-500 w-7 h-7" />
                  : <Copy className="opacity-0 group-hover:opacity-100 w-7 h-7" />}
              </div>
            </div>
          </div>
        </div>

        {/* NOTE */}
        <div className="!mt-auto pt-4 text-xs text-slate-600 flex items-start gap-3 bg-yellow-50 p-3 rounded-lg border border-yellow-400">
          <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0" />
          <span>
            <span className="font-bold text-yellow-700">Important:</span> To ensure your order is confirmed automatically, please transfer the exact amount and content.
          </span>
        </div>
      </div>
    </div>
  );
}