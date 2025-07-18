import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ShieldX } from "lucide-react";

interface BookingFailedDialogProps {
  onClose: () => void;
  errorMessage?: string;
}

export function BookingFailedDialog({ onClose, errorMessage }: BookingFailedDialogProps) {
  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Decorative Header */}
        <div className="p-8 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-20 h-20 flex items-center justify-center bg-red-100 rounded-full mb-5">
            <ShieldX className="w-12 h-12 text-red-600" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-slate-800">Payment Unsuccessful</h2>

          {/* Main Message */}
          <p className="mt-2 text-slate-500">
            Your appointment has not been booked.
          </p>

          {/* Specific Error Reason from Backend */}
          {errorMessage && (
            <div className="mt-6 w-full text-left bg-slate-50 p-4 rounded-lg border">
              <p className="text-sm font-semibold text-slate-600">Reason:</p>
              <p className="text-sm font-mono text-red-700 mt-1">{errorMessage}</p>
            </div>
          )}

          {/* Action Button */}
          <Button
            className="w-full mt-8 py-6 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] 
                      hover:from-[#15305f] hover:to-[#3a6ad0] text-white text-lg 
                      font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all 
                      duration-300 relative overflow-hidden group cursor-pointer"
            onClick={onClose}
          >
            <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full 
                          group-hover:translate-x-full transition-transform duration-700"></span>
            <div className="relative flex items-center justify-center">Try Again</div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}