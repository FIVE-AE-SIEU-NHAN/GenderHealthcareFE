import React from "react";
import { Button } from "@/components/ui/button";
import { Lock, UserPlus, LogIn } from "lucide-react";
import unAuth from "@/assets/images/unauth.png"; 

export const Unauthorized = () => {
  return (
    <div className="relative w-full text-dark-blue flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-[calc(100vh-72px)]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <Lock className="absolute top-12 left-8 text-blue-200 w-24 h-24 opacity-40 rotate-6" />
        <UserPlus className="absolute top-36 right-14 text-pink-300 w-32 h-32 opacity-20 -rotate-12" />
        <LogIn className="absolute bottom-20 left-10 text-blue-300 w-20 h-20 opacity-30 rotate-3" />
      </div>
      <section className="z-10 flex-grow grid place-items-center px-6">
        <div className="container grid gap-12 lg:max-w-4xl lg:grid-cols-2 lg:items-center">
          <div className="text-center space-y-6 max-w-lg mx-auto text-shadow-md/10">
            <p className="text-2xl sm:text-3xl font-bold uppercase text-light-blue tracking-wide">
              Unauthorized
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
              Access Denied
            </h1>
            <p className="font-semibold text-semi-dark-blue leading-relaxed text-xl sm:text-2xl w-116">
              You need to be logged in to access this page. Please log in or sign up to continue.
            </p>

            <div className="flex justify-center gap-6 mt-6">
              <Button
                onClick={() => (window.location.href = "/login")}
                className="min-w-[126px] bg-light-blue hover:bg-semi-dark-blue text-white px-6 py-6 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-transform duration-200 ease-in-out active:scale-95 hover:-translate-y-0.5 active:translate-y-0.5"
              >
                <LogIn className="inline mr-1 h-6 w-6" /> Login
              </Button>
              <Button
                onClick={() => (window.location.href = "/signup")}
                variant="outline"
                className="text-light-blue border-light-blue hover:bg-blue-50 hover:text-light-blue px-6 py-6 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-transform duration-200 ease-in-out active:scale-95 hover:-translate-y-0.5 active:translate-y-0.5"
              >
                <UserPlus className="inline mr-1 h-6 w-6" /> Sign Up
              </Button>
            </div>
          </div>

          {/* Illustration Block */}
          <div className="flex flex-col items-center justify-center">
            <img
              src= {unAuth}
              alt="Unauthorized access illustration"
              className="w-64 lg:w-[360px] ml-7 animate-floating"
            />
            <div className="mt-6 h-8 w-36 rounded-full bg-blue-900/20 blur-md animate-shadow"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Unauthorized;