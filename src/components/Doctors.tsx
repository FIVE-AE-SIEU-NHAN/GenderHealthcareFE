// components/DoctorsCarousel.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { FaHeartbeat } from "react-icons/fa";

type Doctor = {
  name: string;
  specialty: string;
  image: string;
};

const doctors: Doctor[] = [
  {
    name: "Dr. Julia Jany",
    specialty: "Gynecology Specialist",
    image: "/images/bacsi3.jpg", // Place these in `public/images/`
  },
  {
    name: "Dr. Michel Liu",
    specialty: "Heart Specialist",
    image: "/images/bacsi3.jpg",
  },
  {
    name: "Dr. Jesmine Ruby",
    specialty: "Neurology Specialist",
    image: "/images/bacsi3.jpg",
  },
  {
    name: "Dr. bacsi3 Smith",
    specialty: "Cardiology Specialist",
    image: "/images/bacsi3.jpg",
  },
  {
    name: "Dr. Julia Jany",
    specialty: "Gynecology Specialist",
    image: "/images/bacsi3.jpg", // Place these in `public/images/`
  },
  {
    name: "Dr. Michel Liu",
    specialty: "Heart Specialist",
    image: "/images/bacsi3.jpg",
  },
  {
    name: "Dr. Jesmine Ruby",
    specialty: "Neurology Specialist",
    image: "/images/bacsi3.jpg",
  },
  {
    name: "Dr. bacsi3 Smith",
    specialty: "Cardiology Specialist",
    image: "/images/bacsi3.jpg",
  },
  {
    name: "Dr. Julia Jany",
    specialty: "Gynecology Specialist",
    image: "/images/bacsi3.jpg", // Place these in `public/images/`
  },
  {
    name: "Dr. Michel Liu",
    specialty: "Heart Specialist",
    image: "/images/bacsi3.jpg",
  },
  {
    name: "Dr. Jesmine Ruby",
    specialty: "Neurology Specialist",
    image: "/images/bacsi3.jpg",
  },
];

export function Doctors() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-24">
        <p className="section-text flex gap-4 items-center justify-center">
          <FaHeartbeat /> MEDICAL EXPERTS
        </p>
        <div className="font-semibold text-shadow-md font-outfit text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue leading-snug">
          <h2 className="">
            Skilled <span className="font-normal">Professionals</span>
          </h2>
          <div className="">at <span className="text-[#16259a]">Care4Gender</span></div>
        </div>

      </div>

      <Carousel className="w-full mb-24">
        <CarouselContent className="gap-4">
          {doctors.map((doc, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="p-4 text-center shadow-xl rounded-2xl">
                <CardContent className="flex flex-col items-center space-y-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="rounded-lg object-cover w-48 h-48"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-blue-700">{doc.specialty}</p>
                  </div>
                  <button className="text-2xl text-blue-800 rounded-full bg-blue-100 w-8 h-8 leading-8">
                    +
                  </button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
