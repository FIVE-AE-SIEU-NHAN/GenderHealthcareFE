import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, AtSign, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils"; 

import { authApi } from "@/apis/authApi";
import { useAuth } from "@/contexts/AuthContext";
import GoogleLoginButton from "../GoogleLogin";
import logo from "@/assets/images/logo1.png";

type FormData = {
  email: string;
  password: string;
};

interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: {
        [key in keyof FormData]?: string;
      };
    };
  };
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();
  const [errorServer, setErrorServer] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await authApi.login(data);
      const accessToken = res?.data?.result?.access_token;

      if (accessToken) {
        loginContext(accessToken);
        
        navigate('/');
      } else {
        toast.error("Login Failed", { description: "Could not retrieve login credentials." });
      }

    } catch (err: unknown) {
      const error = err as ApiError;
      /* KietMN code trả về cái API kiểu.... :D
      Trả về 2 dạng:
       
      1. Field-specific errors
        "message": "Validation error",
        "errors": {
            "password": "Password length must be from 8 to 50"
        }


      2. Error NHƯNG LẠI LÀ DƯỚI DẠNG message :v
        {
          "message": "Email or password is incorrect"
        }
      */

      const serverFieldErrors = error.response?.data?.errors;
      const generalMessage = error.response?.data?.message;

      // 1. Check for FIELD-SPECIFIC errors first.
      // Example: { "errors": { "password": "Password is too short" } }
      if (serverFieldErrors) {
        Object.entries(serverFieldErrors).forEach(([field, message]) => {
          // Attach the error message directly to the corresponding form field.
          if (field === 'email' || field === 'password') {
             setError(field, { type: "server", message });
          }
        });
      }
      // 2. If no field errors, check for a GENERAL error message.
      // Example: { "message": "Email or password is incorrect" }
      else if (generalMessage) {
        toast.error("Login Failed", {
          description: generalMessage,
        });
        setErrorServer(generalMessage);
      }
      // 3. Fallback for any other kind of error (e.g., network failure).
      else {
        toast.error("An Error Occurred", {
          description: "Could not connect to the server. Please try again.",
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl animate-fade-in-up z-10 mt-8 mb-8">
      <CardHeader className="text-center">
        <img src={logo} alt="logo" className="mx-auto w-20" />
        <CardTitle className="text-2xl font-bold text-dark-blue text-shadow-lg">
          Welcome Back
        </CardTitle>
        <p className="text-gray-500 text-shadow-md">
          Don't have an account? <a href="/signup" className="text-[#0066ff] hover:underline">Sign up</a>
        </p>
      </CardHeader>
      <CardContent className="mb-7">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-base 
        [&_label]:font-semibold [&_input]:h-11">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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

          {/* Password */}
          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="form-icon" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                disabled={isSubmitting}
                className={cn("pl-8 pr-10", { "border-red-500": errors.password })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
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

          {/* Forgot password? */}
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-[#0066ff] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Invalid Email or Pass */}
          {errorServer && (
            <p id="errorServer" className="text-red-500 text-xl mx-auto">{errorServer}</p>
          )}

          {/* Submit */}
          <Button type="submit" className="h-[45px] w-full bg-dark-blue hover:bg-semi-dark-blue text-lg"
            disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>

          {/* ------- Or ------- */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Google Login Button */}
          <GoogleLoginButton />
        </form>
      </CardContent>
    </Card>
  );
}