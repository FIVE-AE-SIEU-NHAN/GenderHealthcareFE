import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is a Naturopath?",
    answer:
      "Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse rhoncus laoreet purus quis elementum. Phasellus sed efficitur dolor, et ultricies sapien. Quisque fringilla sit amet dolor commodo efficitur. Aliquam et sem odio. In ullamcorper nisi nunc, et molestie ipsum iaculis sit amet."
  },
  { 
    question: "What is a Holistic Nutritionist?", 
    answer: "A Holistic Nutritionist is a professional who uses whole-food nutrition, lifestyle changes, and natural health principles to improve overall health and wellness." 
  },
  { 
    question: "How can a Naturopath help me?", 
    answer: "Naturopaths can help identify the root causes of health issues and create personalized treatment plans using natural therapies like nutrition, lifestyle counseling, herbal medicine, and other holistic approaches." 
  },
  { 
    question: "How do online Nutrition consultations work?", 
    answer: "Online nutrition consultations typically involve video calls where we discuss your health history, current diet, lifestyle, and health goals. We'll develop a personalized nutrition plan that you can follow remotely, with regular follow-ups to track progress." 
  },
  { 
    question: "What is a 'healthy diet'?", 
    answer: "A healthy diet is balanced, varied, and tailored to your individual needs. It typically includes plenty of vegetables, fruits, whole grains, lean proteins, and healthy fats while minimizing processed foods, added sugars, and artificial ingredients." 
  },
  { 
    question: "How can I get nutrition advice about a medical condition?", 
    answer: "You can schedule a consultation where we'll discuss your medical condition and how nutrition may help. I work alongside your medical team to develop complementary nutrition strategies that support your overall treatment plan." 
  }
];

export default function FAQAndContact() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1e3a8a] text-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/20">
              <button
                className={`w-full text-left py-4 px-4 font-medium flex justify-between items-center ${
                  openIndex === index ? "bg-white/10" : ""
                } hover:bg-white/5 transition duration-200`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
                {openIndex === index ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-white/90 ">
                  {faq.answer || "Content coming soon..."}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white text-[#1e3a8a] p-8 rounded-t-3xl md:rounded-none md:rounded-l-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-[#1e3a8a]">How can I help you?</h2>
        <p className="mb-4 text-sm text-[#1e3a8a]/70">
          Please take a few moments to let me know about yourself and your
          health goals before we start working together:
        </p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter your Name"
            className="w-full border-b border-[#1e3a8a]/30 outline-none py-2 focus:border-[#1e3a8a] text-[#1e3a8a]"
            required
          />
          <input
            type="email"
            placeholder="Enter a valid email address"
            className="w-full border-b border-[#1e3a8a]/30 outline-none py-2 focus:border-[#1e3a8a] text-[#1e3a8a]"
            required
          />
          <textarea
            placeholder="Your message"
            rows={3}
            className="w-full border-b border-[#1e3a8a]/30 outline-none py-2 focus:border-[#1e3a8a] text-[#1e3a8a]"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#1e3a8a] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#15296b] transition duration-300"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
}
