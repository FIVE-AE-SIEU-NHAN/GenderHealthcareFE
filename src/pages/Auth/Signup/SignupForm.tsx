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
import { authApi } from "@/apis/authApi";
import { toast } from "sonner";
// import GoogleLoginButton from "../GoogleLogin";


type FormData = {
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

interface OtpError {
  response?: {
    data?: {
      message?: string;
      errors?: {
        [key: string]: string;
      };
    };
  };
}

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [backendError, setBackendError] = useState("");


  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setBackendError(""); 
    const formatted = {
      ...data,
      dob: data.dob
        ? format(new Date(data.dob), "dd/MM/yyyy")
        : "",
    };
    console.log("Signup data:", formatted);

    try {
      const res = await authApi.register(data);
      if (res.status === 200) {
        // navigate('/');
        // toast("Registration successful", {
        //   description: "Sunday, December 03, 2023 at 9:00 AM",
        //   action: {
        //     label: "Undo",
        //     onClick: () => console.log("Undo"),
        //   },
        // })
        alert("Registration successful");
      }
    } catch (err: unknown) {
      const error = err as OtpError;
      // Set lỗi cho các field cụ thể
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;

        if (serverErrors.date_of_birth) {
          setError("dob", {
            type: "server",
            message: "Date of birth is required"
          });
        }
        // Set lỗi email từ server
        if (serverErrors.email) {
          setError("email", {
            type: "server",
            message: serverErrors.email
          });
        }

        if (serverErrors.name) {
          setError("fullName", {
            type: "server",
            message: serverErrors.name
          });
        }
        if (serverErrors.gender) {
          setError("gender", {
            type: "server",
            message: serverErrors.gender
          });
        }

        // Set lỗi password từ server
        if (serverErrors.password) {
          setError("password", {
            type: "server",
            message: serverErrors.password
          });
        }

        // Set lỗi confirmPassword từ server
        if (serverErrors.confirm_password) {
          setError("confirmPassword", {
            type: "server",
            message: serverErrors.confirm_password
          });
        }

        // Set lỗi otp từ server
        if (serverErrors.email_verify_token) {
          setError("otp", {
            type: "server",
            message: serverErrors.email_verify_token
          });
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const [otpCountdown, setOtpCountdown] = useState(0);

  useEffect(() => {
    if (otpCountdown === 0) return;

    const interval = setInterval(() => {
      setOtpCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpCountdown]);

  const handleGetOtp = async () => {
    if (otpCountdown === 0) {
      // Trigger OTP logic (e.g. send OTP to email)
      console.log("Send OTP");

      const emailValue = watch("email");
      console.log("Email for OTP:", emailValue);
      try {
        const res = await authApi.getOtp({ email: emailValue });
        if (res.status === 200) {
          // navigate('/');
          // toast("OTP sent successfully", {
          //   description: "Sunday, December 03, 2023 at 9:00 AM",
          //   action: {
          //     label: "Undo",
          //     onClick: () => console.log("Undo"),
          //   },
          // })
          alert("OTP sent successfully");
          setOtpCountdown(120);
        }
      } catch (err: unknown) {
        const error = err as OtpError;
        if (error.response?.data?.errors) {
          const serverErrors = error.response.data.errors;
          if (serverErrors.email) {
            alert(serverErrors.email);
          } else {
            toast.error("Failed to send OTP. Please try again.");
          }
        }
      }
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
                className="pl-8"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Gender & Date of Birth */}
          <div className="grid grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Controller
                control={control}
                name="dob"
                render={({ field }) => <DatePicker field={field} />}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
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
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 -mt-2.5">
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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
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
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
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
            {errors.otp && (
              <p className="text-red-500 text-sm">{errors.otp.message}</p>
            )}
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

          {/* <GoogleLoginButton /> */}
        </form>
      </CardContent>
    </Card>
  );
}
