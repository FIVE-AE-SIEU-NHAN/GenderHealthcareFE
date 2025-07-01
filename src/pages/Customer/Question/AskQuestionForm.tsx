import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Calendar, User, Loader2 } from "lucide-react";
import { FaHeartbeat } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useQuestionMutations } from "@/hooks/customer/useQuestionMutations"; 
import { TOPIC_OPTIONS } from "@/Application/constants/appointment";

// FAQ type and data remain the same
interface FAQ {
  question: string;
  answer: string;
}

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

// Define a validation schema that matches the backend requirements
const formSchema = z.object({
  topic: z.string({ required_error: "Please select a topic." }).min(1, { message: "Please select a topic." }),
  question: z.string()
    .min(20, { message: "Your question must be at least 20 characters long." })
    .max(1000, { message: "Your question cannot exceed 1000 characters." }),
});

export default function AskQuestion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [faqContainerStyle, setFaqContainerStyle] = useState<React.CSSProperties>({});
  const formRef = useRef<HTMLDivElement>(null);

  const { askQuestion } = useQuestionMutations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      question: "",
    },
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    askQuestion.mutate(values, {
      onSuccess: () => {
        setFormSubmitted(true);
        setTimeout(() => {
          form.reset();
          setFormSubmitted(false);
        }, 5000);
      },
    });
  }

  return (
    <div className="min-h-screen p-6 md:p-10 lg:p-16 relative" style={{ backgroundImage: "linear-gradient(135deg, rgba(240, 245, 255, 0.97), rgba(230, 240, 255, 0.95)), url('/images/medical-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A3973] mb-3">Frequently Asked Questions</h1>
        <div className="w-60 h-1 bg-gradient-to-r from-[#1A3973] to-[#4F80E1] mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
        <div className="bg-[#1A3973] rounded-2xl p-8 md:p-10 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_30px_-15px_rgba(26,57,115,0.2)] border border-[#1A3973] hover:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.2),0_0_40px_-15px_rgba(26,57,115,0.3)] transition-all duration-300" style={faqContainerStyle}>
            {/* Your FAQ content here, unchanged */}
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
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent Successfully!</h3>
              <p className="text-green-600">Thank you for submitting your question. A consultant will get back to you shortly.</p>
            </div>
          ) : (
            <Form {...form}>
              <form className="space-y-5 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="topic" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-1 block">Topic of Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full rounded-lg"><SelectValue placeholder="Select a topic" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TOPIC_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="question" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-1 block">Your Question</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Please describe your health goals or questions in detail..." rows={4} className="w-full rounded-lg border-gray-300 min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <Button type="submit" disabled={askQuestion.isPending} className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] hover:from-[#15305f] hover:to-[#3a6ad0] text-white text-lg font-semibold rounded-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  {askQuestion.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <FaHeartbeat className="mr-2" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}