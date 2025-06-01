import React from "react";
import { Button } from "@/components/ui/button"; // shadcn button
import MedicalIllustration from "@/assets/images/notfound1.png";
import { Stethoscope, HeartPulse, Hospital, Syringe } from "lucide-react";

const NotFound = () => {
  return (
    <div className="relative w-full text-dark-blue flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-[calc(100vh-72px)]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <Stethoscope className="absolute top-10 left-10 text-blue-200 w-24 h-24 opacity-50 rotate-12" />
        <HeartPulse className="absolute top-40 right-12 text-pink-300 w-32 h-32 opacity-20 -rotate-12" />
        <Hospital className="absolute bottom-20 left-8 text-blue-300 w-20 h-20 opacity-25 rotate-6" />
        <Syringe className="absolute bottom-10 right-10 text-blue-200 w-16 h-16 opacity-50 rotate-45" />
      </div>
      <section className="z-10 flex-grow grid place-items-center px-6">
        <div className="container grid gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center">
          <div className="text-center space-y-6 max-w-lg mx-auto">
            <p className="text-2xl sm:text-3xl font-bold uppercase text-light-blue tracking-wide">
              Error 404
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold leading-tight whitespace-nowrap md:-ml-10 lg:ml-0 xl:-ml-10">
              Oops! Page Not Found
            </h1>
            <p className="font-semibold text-semi-dark-blue leading-relaxed text-xl sm:text-2xl md:text-3xl w-86 sm:w-full">
              Sorry, we can’t find the page you’re looking for. It might have been moved or
              doesn’t exist anymore.
            </p>

            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-light-blue hover:bg-semi-dark-blue text-white px-4 py-7 rounded-full font-bold text-2xl hover:-translate-y-0.5 active:translate-y-0.5 active:scale-95 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
            >
              Go Back Home
            </Button>
          </div>

          {/* Image block */}
          <div className="flex flex-col items-center justify-center">
            <img
              src={MedicalIllustration}
              alt="Medical staff illustration"
              className="w-64 lg:w-[360px] animate-floating"
            />
            <div className="mt-6 h-8 w-36 rounded-full bg-blue-900/20 blur-md animate-shadow"></div>
          </div>
        </div>
      </section>      
    </div>
  );
};

export default NotFound;
