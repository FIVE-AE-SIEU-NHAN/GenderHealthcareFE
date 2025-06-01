import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Lock, User, Eye, EyeOff, KeyRound, AtSign } from "lucide-react";
import { DatePicker } from "@/lib/DatePicker";
import { format } from "date-fns"
import logo from "@/assets/images/logo1.png"; 

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import GoogleLoginButton from "../GoogleLogin";


type FormData = {
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const formatted = {
    ...data,
    dob: data.dob
      ? format(new Date(data.dob), "dd/MM/yyyy")
      : "",
  };
    console.log("Signup data:", formatted);
  };

  const [otpCountdown, setOtpCountdown] = useState(0);

  useEffect(() => {
    if (otpCountdown === 0) return;

    const interval = setInterval(() => {
      setOtpCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpCountdown]);

  const handleGetOtp = () => {
    if (otpCountdown === 0) {
      // Trigger OTP logic (e.g. send OTP to email)
      console.log("Send OTP");
      setOtpCountdown(120); // 2 minutes
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <Card className="w-full max-w-xl shadow-2xl animate-fade-in-up z-10 mt-8 mb-8">
      <CardHeader className="text-center">
        <img src={logo} alt="logo" className="mx-auto w-20" />
        <CardTitle className="text-2xl font-bold text-dark-blue text-shadow-lg">
          Hello there!
        </CardTitle>
        <p className="text-gray-500 text-shadow-md">
          Already have an account? <a href="/login" className="text-[#0066ff] hover:underline">Log in</a>
        </p>
      </CardHeader>

      <CardContent className="mb-7">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-base 
        [&_label]:font-semibold [&_input]:h-11">

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="form-icon" />
              <Input
                id="fullName"
                placeholder="John Doe"
                {...register("fullName")}
                className="pl-8 text-"
              />
            </div>
          </div>

          {/* Gender & Date of Birth */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="dob"
              render={({ field }) => <DatePicker field={field} />}
            />


            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-11 min-h-[2.75rem] px-3">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <AtSign className="form-icon" />
              <Input
                id="email"
                type="email"
                placeholder="care4gender@example.com"
                {...register("email")}
                className="pl-8"
              />
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="form-icon" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="pl-8 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-3 text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <KeyRound className="form-icon" />
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="pl-8 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-3 text-gray-600"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* OTP Field + Button */}
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <div className="flex gap-2 ">
              <InputOTP maxLength={6} >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button
                type="button"
                variant="outline"
                className="shadow-sm w-[75px] h-11 bg-[#00b3b6] text-white font-semibold"
                onClick={handleGetOtp}
                disabled={otpCountdown > 0}
              >
                {otpCountdown > 0 ? formatTime(otpCountdown) : "Get OTP"}
              </Button>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit"
            className="h-[45px] w-full bg-dark-blue active:bg-[#131045] active:scale-[0.99] 
              shadow-sm hover:bg-dark-blue text-lg cursor-pointer transition-all duration-200 ease-in-out">
            Create Account
          </Button>

          {/* Or Login with Google */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <GoogleLoginButton />
        </form>
      </CardContent>
    </Card>
  );
}
