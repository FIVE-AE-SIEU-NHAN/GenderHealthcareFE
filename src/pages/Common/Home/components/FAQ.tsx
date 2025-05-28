import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FaHeartbeat, FaQuestionCircle } from "react-icons/fa"
import { useState } from "react"
import faq from "@/assets/images/faq.png"

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We provide confidential sexual health consultations, testing, treatment, and educational resources."
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book through our web portal by creating an account and choosing an available time slot with a doctor."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, your privacy is our top priority. We use industry-standard encryption to protect your information."
  },
  {
    question: "Do I need a referral?",
    answer: "No, you can book a consultation directly through our system without a referral."
  }
]

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">
        <div data-sal="slide-right" data-sal-delay="100" data-sal-duration="800">
          <p
            className="section-text flex gap-4 items-center"
            data-sal="fade"
            data-sal-duration="500"
          >
            <FaHeartbeat /> FAQ's
          </p>

          <h2
            className="max-w-200 text-shadow-md font-outfit font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue leading-snug"
            data-sal="slide-up"
            data-sal-duration="700"
            data-sal-delay="100"
          > Frequently Ask Questions
          </h2>
          <br />
          <p className="mb-6 text-muted-foreground text-md">
            Find answers to the most commonly asked questions about our services.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openItem === `item-${index}`
              return (
                <Accordion
                  key={index}
                  type="single"
                  collapsible
                  value={isOpen ? `item-${index}` : ""}
                  onValueChange={(val) => setOpenItem(val)}
                >
                  <AccordionItem value={`item-${index}`} className="border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-background">
                    <AccordionTrigger className="px-4 py-3 text-base font-semibold hover:no-underline flex items-center justify-between">
                      <div className="flex items-center gap-3 text-left text-xl text-dark-blue">
                        <FaQuestionCircle className="size-5 mt-0.5 text-light-blue" />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-1 text-muted-foreground text-lg leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            })}
          </div>
        </div>

        {/* RIGHT: Image / Illustration */}
        <div
          data-sal="slide-left"
          data-sal-delay="200"
          data-sal-duration="800"
          className="md:flex justify-center md:justify-end hidden overflow-hidden"
        >
          <img
            src={faq}
            alt="FAQ illustration"
            className=" md:max-w-full h-auto drop-shadow-2xl animate-floating"
          />
        </div>
      </div>
    </section>
  )
}
export default FAQSection;