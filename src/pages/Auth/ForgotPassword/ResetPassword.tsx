import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import logo from "@/assets/images/logo1.png";

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("forgot_password_token");


  useEffect(() => {
    if (!token) {
      navigate("/404");
    }
  }, [token, navigate]);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  // const onSubmit = (data: FormData) => {
  //   console.log("Reset password:", data);
  //   // API
  // };
  const onSubmit = async (data: FormData) => {
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    try {
      await axios.post("/user/reset-password", {
        token,
        password,
        confirmPassword,
      });

      // Navigate tới trang thành công
      navigate("/login");
    } catch (error) {
      console.error("Reset failed", error);
      alert("Reset failed. Please try again.");
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-63px)]
                    bg-[url('@/assets/images/bs2.webp')] bg-no-repeat bg-center bg-cover relative">
      <div className="overlay absolute inset-0 bg-black/20 z-0" />
      <Card className="w-full max-w-md shadow-2xl mt-12 animate-fade-in-up z-2">
        <CardHeader className="text-center">
          <img src={logo} alt="logo" className="mx-auto w-24" />
          <CardTitle className="text-2xl font-bold text-dark-blue">
            Reset Your Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-base">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="form-icon" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <KeyRound className="form-icon" />
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === password || "Passwords do not match",
                  })}
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
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-dark-blue hover:bg-[#131045] active:scale-[0.99] text-base font-semibold"
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
