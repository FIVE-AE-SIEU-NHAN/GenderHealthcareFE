import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { FaHeartbeat, FaPhone, FaFacebookF, FaInfoCircle } from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay"
import doctor from "@/assets/images/bacsi3.jpg"; 

type Doctor = {
  name: string;
  specialty: string;
  image: string;
};

const doctors: Doctor[] = [
  {
    name: "Dr. Julia Jany",
    specialty: "Gynecology Specialist",
    image: doctor,
  },
  {
    name: "Dr. Michel Liu",
    specialty: "Heart Specialist",
    image: doctor,
  },
  {
    name: "Dr. Jesmine Ruby",
    specialty: "Neurology Specialist",
    image: doctor,
  },
  {
    name: "Dr. bacsi3 Smith",
    specialty: "Cardiology Specialist",
    image: doctor,
  },
  {
    name: "Dr. Julia Jany",
    specialty: "Gynecology Specialist",
    image: doctor,
  },
  {
    name: "Dr. Michel Liu",
    specialty: "Heart Specialist",
    image: doctor,
  },
];

const Doctors = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-10"
      data-sal="fade"
      data-sal-duration="700"
      data-sal-delay="100"
      data-sal-easing="ease-out-back">
      <div className="text-center mb-22"
        data-sal="slide-up"
        data-sal-duration="600"
        data-sal-delay="200">
        <p className="section-text flex gap-4 items-center justify-center" data-sal="slide-right" data-sal-duration="700">
          <FaHeartbeat /> MEDICAL EXPERTS
        </p>
        <div className="font-semibold text-shadow-md font-outfit text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue leading-snug"
          data-sal="slide-up" data-sal-delay="300">
          <h2>
            Skilled <span className="font-normal">Professionals</span>
          </h2>
          <div>at <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-transparent bg-clip-text">Care4Gender</span></div>
        </div>

      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          }),
        ]}
        className="w-full"
        data-sal="fade"
        data-sal-duration="800"
        data-sal-delay="200">
        <CarouselContent className="flex h-126">
          {doctors.map((doc, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="p-0 text-center shadow-xl rounded-2xl h-[93%] flex flex-col">
                <CardContent className="flex flex-col items-center space-y-4 p-0 h-full">
                  <div className="w-full h-[70%] mb-2 overflow-hidden rounded-t-2xl">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-108 hover:rotate-2"
                    />
                  </div>
                  <div className=" flex flex-col justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-dark-blue">
                        {doc.name}
                      </h3>
                      <p className="text-sm text-dark-blue">{doc.specialty}</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-6">
                      <div className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-light-blue transition-colors cursor-pointer">
                        <FaPhone className="text-xl" />
                      </div>
                      <div className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-light-blue transition-colors cursor-pointer">
                        <FaFacebookF className="text-xl" />
                      </div>
                      <div className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-light-blue transition-colors cursor-pointer">
                        <FaInfoCircle className="text-xl" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2 2xl:block">
          <CarouselPrevious className="bg-dark-blue/10 shadow-md backdrop-blur hover:bg-dark-blue/20 text-dark-blue hidden [@media(min-width:1464px)]:grid" />
          <CarouselNext className="bg-dark-blue/10 shadow-md backdrop-blur hover:bg-dark-blue/20 text-dark-blue hidden [@media(min-width:1464px)]:grid" />
        </div>
      </Carousel>
    </div>
  );
}
export default Doctors;
