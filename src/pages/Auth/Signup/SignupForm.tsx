import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Lock, User, Eye, EyeOff, KeyRound, AtSign, Phone, Loader2 } from "lucide-react";
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
import GoogleLoginButton from "../GoogleLogin";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";


type FormData = {
  name: string;
  gender: string;
  date_of_birth: string | null; 
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  email_verify_token: string;
};

interface ApiError {
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
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    control,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setOtpCountdown(0);
    try {
      const payload = {
        ...data,
        date_of_birth: data.date_of_birth
          ? format(new Date(data.date_of_birth), "yyyy-MM-dd")
          : "",
        email_verify_token: data.email_verify_token ? data.email_verify_token.toUpperCase() : '',
      };
      console.log(payload)

      const res = await authApi.register(payload);
      const accessToken = res?.data?.result?.access_token;

      if (accessToken) {
        toast.success("Signup Successful", {
          description: "Redirecting to login...",
        });
        navigate("/login");
      } else {
        toast.error("Signup Failed", {
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      const serverFieldErrors = error.response?.data?.errors;
      const generalMessage = error.response?.data?.message;

      if (serverFieldErrors) {
        Object.entries(serverFieldErrors).forEach(([field, message]) => {
          setError(field as keyof FormData, {
            type: "server",
            message,
          });
        });
      } else if (generalMessage) {
        toast.error("Signup Failed", {
          description: generalMessage,
        });
      } else {
        toast.error("An Error Occurred", {
          description: "Could not connect to the server. Please try again.",
        });
      }
    }
  };


  // =========================== OTP =========================== 
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  useEffect(() => {
    if (otpCountdown === 0) return;

    const interval = setInterval(() => {
      setOtpCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpCountdown]);

  const handleGetOtp = async () => {
    if (otpCountdown > 0 || isOtpLoading) return; // Prevent clicks while loading or counting down

    setIsOtpLoading(true); 
    try {
      const emailValue = getValues("email");
      const res = await authApi.getOtp({ email: emailValue });
      if (res.status === 200) {
        toast.success("OTP sent successfully", { description: "Please check your email!" });
        setOtpCountdown(120);
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      const emailError = error.response?.data?.errors?.email;
      if (emailError) {
        // setError("email", { type: "server", message: emailError });
        toast.error("Failed to send OTP", { description: emailError });
      } else {
        toast.error("Failed to send OTP", { description: error.response?.data?.message || "Please try again." });
      }
    } finally {
      setIsOtpLoading(false); 
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
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="form-icon" />
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                disabled={isSubmitting}
                className={cn("pl-8", { "border-red-500": errors.name })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Phone number */}
          <div className="grid grid-cols-2">
            <div className="space-y-2 mr-3">
              <Label htmlFor="phone_number">Phone Number</Label>
              <div className="relative">
                <Phone className="form-icon" />
                <Input
                  id="phone_number"
                  placeholder="0912345678"
                  {...register("phone_number")}
                  disabled={isSubmitting}
                  className={cn("pl-8", { "border-red-500": errors.phone_number })}

                />
              </div>
              {errors.phone_number && (
                <p className="text-red-500 text-sm">{errors.phone_number.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <AtSign className="form-icon" />
                <Input
                  id="email"
                  type="text"
                  placeholder="care4gender@example.com"
                  {...register("email")}
                  disabled={isSubmitting}
                  className={cn("pl-8", { "border-red-500": errors.email })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>


          {/* Gender & Date of Birth */}
          <div className="grid grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Controller
                control={control}
                name="date_of_birth"
                render={({ field }) => <DatePicker field={field} />}
              />
              {errors.date_of_birth && (
                <p className="text-red-500 text-sm">{errors.date_of_birth.message}</p>
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

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-2">
            <div className="space-y-2 mr-3">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="form-icon" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  disabled={isSubmitting}
                  className={cn("pl-8", { "border-red-500": errors.password })}
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
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <div className="relative">
                <KeyRound className="form-icon" />
                <Input
                  id="confirm_password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirm_password")}
                  disabled={isSubmitting}
                  className={cn("pl-8 pr-10", { "border-red-500": errors.confirm_password })}
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
              {errors.confirm_password && (
                <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>
              )}
            </div>
          </div>

          {/* OTP Field + Button */}
          <div className="space-y-2">
            <Label htmlFor="email_verify_token">Email Verification Code</Label>
            <div className="flex gap-2 ">
              <Controller control={control} name="email_verify_token" render={({ field }) => (
                <InputOTP maxLength={6} {...field} disabled={isSubmitting} >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )} />
              <Button
                type="button"
                variant="outline"
                className="
                  shadow-sm w-[120px] shrink-0 h-11 bg-[#00b3b6]
                  text-white font-semibold cursor-pointer
                  hover:bg-[#00b3b6] hover:text-white active:scale-[0.97] 
                  transition-all duration-200 ease-in-out"
                onClick={handleGetOtp}
                disabled={otpCountdown > 0 || isOtpLoading} // Disable button when loading OR counting down
              >
                {isOtpLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : otpCountdown > 0 ? (
                  formatTime(otpCountdown)
                ) : (
                  "Get OTP"
                )}
              </Button>
            </div>
            {errors.email_verify_token && (
              <p className="text-red-500 text-sm">{errors.email_verify_token.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit"
            className="h-[45px] w-full bg-dark-blue active:bg-[#131045] active:scale-[0.99] 
              shadow-sm hover:bg-dark-blue text-lg cursor-pointer transition-all duration-200 ease-in-out"
            disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
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
