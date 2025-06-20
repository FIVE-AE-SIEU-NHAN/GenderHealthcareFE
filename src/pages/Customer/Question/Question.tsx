import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Calendar, User } from "lucide-react";
import { FaHeartbeat } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FAQ {
  question: string;
  answer: string;
}

const topicOptions = [
  { value: "naturopathy", label: "Naturopathy" },
  { value: "nutrition", label: "Nutrition" },
  { value: "consultation", label: "Consultation" },
  { value: "diet-advice", label: "Diet Advice" },
  { value: "other", label: "Other" }
];

const faqs: FAQ[] = [
  {
    question: "What is Gender Healthcare?",
    answer: "Gender healthcare is an approach that recognizes and addresses the specific health needs and challenges faced by individuals based on their gender identity and biological sex."
  },
  {
    question: "Why is gender-specific healthcare important?",
    answer: "Because males and females often have different symptoms, risk factors, and treatment responses for the same conditions. Gender-specific care ensures more accurate diagnoses and effective treatments."
  },
  {
    question: "What services are offered in gender-focused healthcare?",
    answer: "Services can include hormone therapy, reproductive health support, gender-affirming counseling, and screenings tailored to biological sex or gender identity."
  },
  {
    question: "Is gender healthcare only for transgender individuals?",
    answer: "No. Gender healthcare applies to everyone, including cisgender individuals, by acknowledging how gender impacts health risks, access to care, and wellness strategies."
  },
  {
    question: "How can I access gender-sensitive care?",
    answer: "Start by finding clinics or professionals that advertise inclusive services, use gender-neutral language, and demonstrate understanding of gender-diverse needs."
  },
  {
    question: "Are consultations confidential?",
    answer: "Yes. All consultations are private and confidential, ensuring safe and respectful communication about sensitive gender-related health topics."
  }
];

export default function FAQAndContact() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [faqContainerStyle, setFaqContainerStyle] = useState<React.CSSProperties>({});
  const formRef = useRef<HTMLDivElement>(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      topic: "",
      message: ""
    }
  });

  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current) {
        const formHeight = formRef.current.clientHeight;
        setFaqContainerStyle({
          minHeight: `${formHeight}px`,
          height: 'auto',
          alignSelf: 'flex-start'
        });
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [formSubmitted]);

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setFormSubmitted(true);
    setTimeout(() => {
      reset();
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-6 md:p-10 lg:p-16 relative" style={{ backgroundImage: "linear-gradient(135deg, rgba(240, 245, 255, 0.97), rgba(230, 240, 255, 0.95)), url('/images/medical-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A3973] mb-3">Frequently Asked Questions</h1>
        <div className="w-60 h-1 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        <div className="bg-[#1A3973] rounded-2xl p-8 md:p-10 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_30px_-15px_rgba(26,57,115,0.2)] border border-[#1A3973] hover:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.2),0_0_40px_-15px_rgba(26,57,115,0.3)] transition-all duration-300" style={faqContainerStyle}>
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white/20 p-4 rounded-full mb-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]">
              <Calendar className="text-3xl w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">Common Questions</h2>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/20 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <button className={`w-full text-left py-4 px-5 font-medium flex justify-between items-center ${openIndex === index ? "bg-white/15" : "bg-white/5"} hover:bg-white/10 transition duration-300 rounded-t-xl`} onClick={() => setOpenIndex(openIndex === index ? null : index)} aria-expanded={openIndex === index}>
                  <span className="text-lg">{faq.question}</span>
                  <div className="bg-white/20 rounded-full p-1.5 shadow-inner">
                    {openIndex === index ? <ChevronUp className="text-white w-4 h-4" /> : <ChevronDown className="text-white w-4 h-4" />}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-5 py-4 text-sm text-white/90 bg-white/5 border-t border-white/10 rounded-b-xl">
                    {faq.answer || "Content coming soon..."}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div ref={formRef} className="bg-white rounded-2xl p-8 md:p-10 text-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_30px_-15px_rgba(26,57,115,0.2)] border border-white hover:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.2),0_0_40px_-15px_rgba(26,57,115,0.3)] transition-all duration-300">
          <div className="relative mb-5">
            <div className="bg-[#1A3973] rounded-full p-3 w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-sm">
              <User className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-center text-[#1A3973]">How can I help you?</h2>
            <p className="text-sm text-gray-600 text-center mt-2 mb-4">Please take a few moments to let me know about yourself and your health goals before we start working together</p>
            <div className="w-20 h-1 bg-[#1A3973] mx-auto"></div>
          </div>

          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent Successfully!</h3>
              <p className="text-green-600">Thank you for contacting us. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="space-y-5 mt-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Topic of Interest</Label>
                <Controller name="topic" control={control} rules={{ required: "Please select a topic" }} render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full rounded-lg">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topicOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )} />
              </div>
              <div className="w-full">
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Your Message</Label>
                <Controller name="message" control={control} rules={{ required: "Message is required" }} render={({ field }) => (
                  <Textarea placeholder="Tell us about your health goals or questions" rows={4} className="w-full rounded-lg border-gray-300 min-h-[120px]" {...field} />
                )} />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] hover:from-[#15305f] hover:to-[#3a6ad0] text-white text-lg font-semibold rounded-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaHeartbeat className="mr-2" />
                  <span>SEND MESSAGE</span>
                </div>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
