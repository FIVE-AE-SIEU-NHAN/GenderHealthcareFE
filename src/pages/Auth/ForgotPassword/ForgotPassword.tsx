import { useForm } from "react-hook-form";
// import { useState } from "react";
// import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AtSign } from "lucide-react";
import logo from "@/assets/images/logo1.png";

type FormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const onSubmit = (data: FormData) => {
    console.log("Forgot password data:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-63px)]
                    bg-[url('@/assets/images/bs2.webp')] bg-no-repeat bg-center bg-cover relative">
      <div className="overlay absolute inset-0 bg-black/20 z-0" />
      <Card className="w-full max-w-md shadow-2xl mt-12 animate-fade-in-up z-2">
        <CardHeader className="text-center">
          <img src={logo} alt="logo" className="mx-auto w-24" />
          <CardTitle className="text-2xl font-bold text-dark-blue">
            Forgot Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-base">
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
            <Button
              type="submit"
              // disabled={loading}
              className="w-full h-11 bg-dark-blue hover:bg-[#131045] active:scale-[0.99] text-base font-semibold"
            >
              {/* {loading ? "Sending..." : "Send Reset Link"} */}
            </Button>

            {/* {message && <p className="text-green-600 text-sm text-center">{message}</p>}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;