import React from "react";
import {
  PhoneCall,
  CalendarDays,
  Heart,
  Shield,
  Baby,
  Brain,
  Microscope,
  TestTube,
  Award,
  Users,
  Lightbulb,
  ClipboardCheck,
  ShieldCheck,
  Star
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
interface CoreValue {
  id: string;
  title: string;
  desc: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const services: Service[] = [
  {
    id: "WOMENS_REPRODUCTIVE_HEALTH",
    name: "Reproductive Health",
    description: "Comprehensive reproductive care.",
    icon: Heart
  },
  {
    id: "CONTRACEPTION_AND_FAMILY_PLANNING",
    name: "Family Planning",
    description: "Tailored contraception guidance.",
    icon: Shield
  },
  {
    id: "PREGNANCY_AND_MATERNITY_SUPPORT",
    name: "Maternity Support",
    description: "Prenatal and maternity planning.",
    icon: Baby
  },
  {
    id: "STIS",
    name: "STI Screening & Treatment",
    description: "Confidential STI screening and treatment.",
    icon: TestTube
  },
  {
    id: "SEXUAL_HEALTH_AND_GENDER_PSYCHOLOGY",
    name: "Sexual & Gender Psychology",
    description: "Support for sexual wellness and identity.",
    icon: Brain
  },
  {
    id: "TESTING_AND_DIAGNOSTIC_SERVICES",
    name: "Diagnostic Testing",
    description: "Advanced lab and imaging diagnostics.",
    icon: Microscope
  }
];

const coreValues: CoreValue[] = [
  { id: "creativity", title: "Creativity", desc: "Continuous innovation for patient solutions.", icon: Lightbulb },
  { id: "accountability", title: "Accountability", desc: "Highest standards of ethics and expertise.", icon: ClipboardCheck },
  { id: "reliability", title: "Reliability", desc: "Committed to trustworthy care.", icon: ShieldCheck },
  { id: "excellence", title: "Excellence", desc: "Delivering top-quality services.", icon: Star },
  { id: "compassion", title: "Compassion", desc: "Empathy and support at every step of care.", icon: Heart }
];



export function BookingInfoPage() {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path, { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen p-6 md:p-10 lg:p-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A3973] mb-3">Booking Information</h1>
        <div className="w-60 h-1 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto items-stretch">
        {/* Featured Services */}
        <div className="bg-gradient-to-br from-[#E4E8FF] to-[#C7D2FE] rounded-2xl p-8 md:p-10 text-[#1A3973] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-400 flex flex-col h-full">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white/20 p-4 rounded-full mb-4 shadow-md">
              <Heart className="w-8 h-8 text-[#1A3973]" />
            </div>
            <h2 className="text-4xl font-bold mb-2">Featured Services</h2>
            <div className="w-16 h-1 bg-[#1A3973] mx-auto" />
          </div>
          <div className="flex-1 space-y-8">
            {services.map((s, i) => (
              <div key={s.id} className="flex items-start gap-5">
                <div className="bg-white rounded-full p-3 min-w-[50px] min-h-[50px] flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-[#1A3973]">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="flex items-center text-2xl font-bold mb-2">
                    <s.icon className="w-6 h-6 mr-3 text-[#1A3973]" />
                    {s.name}
                  </p>
                  <p className="text-lg text-[#1A3973]/80">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-10 mx-auto bg-white text-[#1A3973] rounded-full px-6 h-14 inline-flex items-center gap-4 shadow-md hover:shadow-lg hover:bg-white/90 cursor-pointer"
            onClick={() => handleClick('/book-consultant')}
          >
            <div className="bg-[#1A3973] p-2 rounded-full">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold uppercase">Connect with Consultant</span>
          </div>
        </div>

        {/* Core Values and Why Choose Us */}
        <div className="bg-gradient-to-br from-[#1A3973] to-[#4F80E1] rounded-2xl p-8 md:p-10 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-400 flex flex-col h-full">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-white/20 p-4 rounded-full mb-4 shadow-md">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-2">Core Values</h2>
            <div className="w-16 h-1 bg-white mx-auto" />
          </div>
          <div className="space-y-6">
            {coreValues.map(v => (
              <div key={v.id} className="flex items-start gap-5">
                <v.icon className="w-8 h-8 text-white/80 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-2xl font-bold mb-1">{v.title}</p>
                  <p className="text-lg text-white/80">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-8 bg-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us</h3>
            <ul className="list-disc list-inside space-y-2 text-white/90">
              <li>Expert team with personalized care plans</li>
              <li>Fast, confidential service in one visit</li>
              <li>24/7 support to address your needs</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/services"
              className="flex items-center justify-center gap-4 bg-white text-[#1A3973] rounded-full px-6 h-14 shadow-md hover:shadow-lg hover:bg-white/90"
            >
              <div className="bg-[#1A3973] p-2 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold uppercase">View Services</span>
            </Link>
            <Link
              to="/book-service"
              className="flex items-center justify-center gap-4 bg-white text-[#1A3973] rounded-full px-6 h-14 shadow-md hover:shadow-lg hover:bg-white/90"
            >
              <div className="bg-[#1A3973] p-2 rounded-full">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold uppercase">Book Service</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingInfoPage;
