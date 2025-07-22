import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FaHeartbeat, FaQuestionCircle } from 'react-icons/fa'
import { useState } from 'react'
import faq from '@/assets/images/faq.png'

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'We provide confidential sexual health consultations, testing, treatment, and educational resources.'
  },
  {
    question: 'How can I book an appointment?',
    answer:
      'You can book through our web portal by creating an account and choosing an available time slot with a doctor.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, your privacy is our top priority. We use industry-standard encryption to protect your information.'
  },
  {
    question: 'Do I need a referral?',
    answer: 'No, you can book a consultation directly through our system without a referral.'
  }
]

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <section className='mx-auto max-w-7xl px-6 py-20'>
      <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2'>
        <div data-sal='slide-right' data-sal-delay='100' data-sal-duration='800'>
          <p className='section-text flex items-center gap-4' data-sal='fade' data-sal-duration='500'>
            <FaHeartbeat /> FAQ's
          </p>

          <h2
            className='font-outfit text-dark-blue max-w-200 text-2xl leading-snug font-semibold text-shadow-md sm:text-3xl md:text-4xl lg:text-5xl'
            data-sal='slide-up'
            data-sal-duration='700'
            data-sal-delay='100'
          >
            {' '}
            Frequently Ask Questions
          </h2>
          <br />
          <p className='text-muted-foreground text-md mb-6'>
            Find answers to the most commonly asked questions about our services.
          </p>
          <div className='space-y-4'>
            {faqs.map((faq, index) => {
              const isOpen = openItem === `item-${index}`
              return (
                <Accordion
                  key={index}
                  type='single'
                  collapsible
                  value={isOpen ? `item-${index}` : ''}
                  onValueChange={(val) => setOpenItem(val)}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className='border-border bg-background overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md'
                  >
                    <AccordionTrigger className='flex items-center justify-between px-4 py-3 text-base font-semibold hover:no-underline'>
                      <div className='text-dark-blue flex items-center gap-3 text-left text-xl'>
                        <FaQuestionCircle className='text-light-blue mt-0.5 size-5' />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='text-muted-foreground px-6 pt-1 pb-6 text-lg leading-relaxed'>
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
          data-sal='slide-left'
          data-sal-delay='200'
          data-sal-duration='800'
          className='hidden justify-center overflow-hidden md:flex md:justify-end'
        >
          <img src={faq} alt='FAQ illustration' className='animate-floating h-auto drop-shadow-2xl md:max-w-full' />
        </div>
      </div>
    </section>
  )
}
export default FAQSection
