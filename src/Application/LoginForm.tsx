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

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setBackendError("");

    await new Promise((r) => setTimeout(r, 600));

    const response = (() => {
      if (data.email !== "dmaK@gmail.com") {
        return {
          ok: false,
          status: 400,
          json: async () => ({
            errors: { email: "Email not found" },
            message: "Invalid credentials",
          }),
        };
      }
      if (data.password !== "123") {
        return {
          ok: false,
          status: 400,
          json: async () => ({
            errors: { password: "Incorrect password" },
          }),
        };
      }

      // ✅ Success
      return {
        ok: true,
        status: 200,
        json: async () => ({ message: "Login successful!" }),
      };
    })();

    try {
      const result = await response.json();

      if (!response.ok) {
        // Handle specific field errors
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            setError(field as keyof FormData, { message: String(message) });
          });
        }

        // Handle general error
        if (result.message) {
          setBackendError(result.message);
        }

        return;
      }

      console.log("Login success:", result);
    } catch (err: any) {
      setBackendError("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl animate-fade-in-up z-10">
      <CardHeader className="text-center">
        <img src="/images/logo.webp" alt="logo" className="mx-auto" />
        <CardTitle className="text-2xl font-bold text-dark-blue text-shadow-lg">
          Welcome Back
        </CardTitle>
        <p className="text-gray-500 text-shadow-md">
          Don't have an account? <a href="/signup" className="text-[#0066ff] hover:underline">Sign up</a>
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-base 
        [&_label]:font-semibold [&_input]:h-11">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <AtSign className="form-icon" />
              <Input
                id="email"
                type="email"
                placeholder="care4gender@example.com"
                {...register("email")}
                disabled={isSubmitting}
                className="pl-8"
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
                className="pl-8 pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-3 text-gray-600 hover:drop-shadow-[0_1px_1px_rgba(0,0,0,.25)] cursor-pointer"
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

          {/* General Backend Error */}
          {backendError && (
            <p className="text-red-500 text-sm text-center">{backendError}</p>
          )}

          {/* Forgot password? */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm text-[#0066ff] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <Button type="submit" className="h-[45px] w-full bg-dark-blue hover:bg-semi-dark-blue text-lg"
            disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
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

          <Button
            type="button"
            variant="outline"
            className="h-[45px] w-full flex items-center justify-center gap-2 text-2xs"
            onClick={() => console.log("Google login clicked")}
          >
            <img src="/images/google.png" alt="Google" className="w-5 h-5" />
            Login with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
