import React from "react";
import {
  PhoneCall,
  CalendarDays,
  Heart,
  Shield,
  Baby,
  TestTube,
  Users,
  MessageSquareQuote,
  UserCheck,
  ClipboardList,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ListOrdered,
  Quote,
  ShieldCheck,
  Lock, // Icon mới
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Dữ liệu dịch vụ được mở rộng ---
const serviceCategories = [
    { 
        name: "Preventive Care & Screening", 
        icon: Shield,
        desc: "Proactive health checks, STI screenings, and regular check-ups."
    },
    { 
        name: "Reproductive Health", 
        icon: Heart,
        desc: "Contraception counseling, family planning, and fertility support."
    },
    { 
        name: "Maternity & Pregnancy", 
        icon: Baby,
        desc: "Comprehensive support from prenatal planning to postpartum care."
    },
    { 
        name: "Diagnostic Services", 
        icon: TestTube,
        desc: "Advanced lab testing and imaging for accurate diagnoses."
    },
];

const SubtleGridPattern = () => (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full stroke-gray-200/50 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"><defs><pattern id="pattern-1" width="200" height="200" x="50%" y={-1} patternUnits="userSpaceOnUse"><path d="M100 200V.5M.5 .5H200" fill="none" /></pattern></defs><rect width="100%" height="100%" strokeWidth={0} fill="url(#pattern-1)" /></svg>
);


export function BookingInfoPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-slate-50 overflow-hidden">
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#1A3973] to-[#4F80E1] bg-clip-text text-transparent pb-2">
          Your Health, Your Sanctuary
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Experience premium care, tailored to your journey. Choose your path below.
        </p>
      </div>

      <Tabs defaultValue="consultant" className="max-w-7xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1.5 bg-gray-200/75 rounded-xl">
          <TabsTrigger value="consultant" className="text-base font-semibold py-2.5 text-gray-600 data-[state=active]:bg-white data-[state=active]:text-[#1A3973] data-[state=active]:shadow-md rounded-lg transition-all duration-300">
            Expert Consultation
          </TabsTrigger>
          <TabsTrigger value="service" className="text-base font-semibold py-2.5 text-gray-600 data-[state=active]:bg-white data-[state=active]:text-[#1A3973] data-[state=active]:shadow-md rounded-lg transition-all duration-300">
            Clinical Services
          </TabsTrigger>
        </TabsList>

        {/* ========================================= */}
        {/* === TAB 1: CONSULTATION === */}
        {/* ========================================= */}
        <TabsContent value="consultant" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* CARD GIỚI THIỆU LỚN */}
            <div className="lg:col-span-2 rounded-2xl p-8 bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-3 mb-4 text-[#1A3973]">
                    <MessageSquareQuote size={28}/>
                    <h2 className="text-3xl font-bold">A Private Conversation, A Clearer Path</h2>
                </div>
                <p className="text-gray-600 text-lg">Our consultations are more than just appointments; they are dedicated moments for you to be heard. In a safe, non-judgmental space, our specialists will listen to your concerns, answer your questions, and empower you with the knowledge to make informed decisions about your health.</p>
            </div>
            
            {/* CARD LỜI HỨA */}
            <div className="rounded-2xl p-8 bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
                <h3 className="font-bold text-lg mb-4 text-[#1A3973]">Our Guarantees:</h3>
                <ul className="space-y-4">
                    <li className="flex gap-3"><Lock className="text-green-500 shrink-0 mt-1"/><div><h4 className="font-semibold">Absolute Confidentiality</h4><p className="text-sm text-gray-500">Your privacy is our highest priority.</p></div></li>
                    <li className="flex gap-3"><Heart className="text-green-500 shrink-0 mt-1"/><div><h4 className="font-semibold">Empathetic Approach</h4><p className="text-sm text-gray-500">You will be treated with respect and kindness.</p></div></li>
                    <li className="flex gap-3"><UserCheck className="text-green-500 shrink-0 mt-1"/><div><h4 className="font-semibold">Qualified Experts</h4><p className="text-sm text-gray-500">Receive advice from certified professionals.</p></div></li>
                </ul>
            </div>

            {/* CARD QUY TRÌNH */}
            <div className="rounded-2xl p-8 bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-3 mb-4 text-[#1A3973]">
                    <ListOrdered />
                    <h3 className="text-xl font-bold">How It Works</h3>
                </div>
                <ol className="relative space-y-6">
                    <li>
                        <h4 className="font-semibold mb-1">1. Book Securely</h4>
                        <p className="text-sm text-gray-500">Choose a time that fits your schedule through our confidential online portal.</p>
                    </li>
                    <li>
                        <h4 className="font-semibold mb-1">2. Connect & Share</h4>
                        <p className="text-sm text-gray-500">Engage in a one-on-one video or phone call with your dedicated specialist.</p>
                    </li>
                    <li>
                        <h4 className="font-semibold mb-1">3. Receive Your Plan</h4>
                        <p className="text-sm text-gray-500">Get a personalized summary and clear next steps sent directly to you.</p>
                    </li>
                </ol>
            </div>

            {/* CARD CTA LỚN */}
            <div className="lg:col-span-2 relative rounded-2xl p-8 bg-gradient-to-br from-[#1A3973] to-[#122850] text-white shadow-xl shadow-blue-900/20 transition-all duration-300 hover:shadow-2xl flex flex-col items-center text-center justify-center">
                 <SubtleGridPattern />
                 <div className="relative z-10">
                    <h2 className="text-4xl font-extrabold mb-3">Ready to Gain Clarity?</h2>
                    <p className="text-blue-200/80 max-w-md mx-auto mb-8">Take the first step towards peace of mind. Our specialists are waiting to help.</p>
                    <Link to="/book-consultant" className="inline-flex items-center justify-center gap-3 bg-white text-[#1A3973] rounded-full px-8 py-4 font-bold uppercase text-lg hover:bg-gray-200 transition-colors">
                        <PhoneCall size={20}/>
                        Book a Consultation
                    </Link>
                 </div>
            </div>
          </div>
        </TabsContent>

        {/* ===================================== */}
        {/* === TAB 2: SERVICES=== */}
        {/* ===================================== */}
        <TabsContent value="service" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-2xl p-8 bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3 mb-6 text-[#1A3973]"><Sparkles /><h2 className="text-3xl font-bold">Our Service Categories</h2></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {serviceCategories.map(s => (
                            <div key={s.name} className="flex flex-col p-5 rounded-lg bg-slate-100/70 hover:bg-white hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3 mb-2"><div className="bg-blue-200 text-blue-800 p-2 rounded-lg"><s.icon size={20} /></div><h4 className="font-semibold text-gray-800">{s.name}</h4></div>
                                <p className="text-sm text-gray-600">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="rounded-2xl p-8 bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3 mb-4 text-[#1A3973]"><HelpCircle /><h3 className="text-xl font-bold">Quick FAQ</h3></div>
                    <div className="space-y-4 text-sm">
                        <div><h4 className="font-semibold text-gray-800">Is my appointment confidential?</h4><p className="text-gray-500">Absolutely. All bookings and services are 100% private.</p></div>
                        <div><h4 className="font-semibold text-gray-800">What do I need to prepare?</h4><p className="text-gray-500">Just bring your ID and any relevant medical history you may have.</p></div>
                    </div>
                </div>

                <div className="lg:col-span-3 rounded-2xl p-8 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] text-white shadow-xl shadow-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-1">Take Control of Your Health</h2>
                        <p className="text-blue-200/90">Booking is simple, secure, and the first step to proactive care.</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <Link to="/book-service" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-[#1A3973] rounded-full px-6 py-3 font-bold uppercase hover:bg-gray-200 transition-colors">
                            <CalendarDays size={20}/> Book Now
                        </Link>

                        <Link to="/services" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-transparent border-2 border-white/60 hover:bg-white/10 rounded-full px-6 py-3 font-bold uppercase text-sm transition-colors">
                            <Users size={18}/> View All
                        </Link>

                        <Link 
                            to="/cycles" 
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white rounded-full px-6 py-3 font-bold uppercase text-sm transition-colors"
                        >
                            <ClipboardList size={18}/> Diagnosis
                        </Link>
                    </div>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BookingInfoPage;