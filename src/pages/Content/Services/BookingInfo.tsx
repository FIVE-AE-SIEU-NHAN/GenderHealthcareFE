import React from 'react'
import {
  Heart,
  Shield,
  Baby,
  TestTube,
  Users,
  MessageSquareQuote,
  UserCheck,
  ClipboardList,
  Sparkles,
  HelpCircle,
  ListOrdered,
  Lock
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FaHeartbeat } from 'react-icons/fa'

// --- Dữ liệu dịch vụ được mở rộng ---
const serviceCategories = [
  {
    name: 'Preventive Care & Screening',
    icon: Shield,
    desc: 'Proactive health checks, STI screenings, and regular check-ups.'
  },
  {
    name: 'Reproductive Health',
    icon: Heart,
    desc: 'Contraception counseling, family planning, and fertility support.'
  },
  {
    name: 'Maternity & Pregnancy',
    icon: Baby,
    desc: 'Comprehensive support from prenatal planning to postpartum care.'
  },
  {
    name: 'Diagnostic Services',
    icon: TestTube,
    desc: 'Advanced lab testing and imaging for accurate diagnoses.'
  }
]

const SubtleGridPattern = () => (
  <svg
    aria-hidden='true'
    className='absolute inset-0 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200/50'
  >
    <defs>
      <pattern id='pattern-1' width='200' height='200' x='50%' y={-1} patternUnits='userSpaceOnUse'>
        <path d='M100 200V.5M.5 .5H200' fill='none' />
      </pattern>
    </defs>
    <rect width='100%' height='100%' strokeWidth={0} fill='url(#pattern-1)' />
  </svg>
)

export function BookingInfoPage() {
  return (
    <div className='relative h-[calc(94dvh)]'>
      {/* Background Image with Blur */}
      <div className='absolute inset-0 h-full w-full bg-[url(https://benhviengreen.com/wp-content/uploads/2016/05/doctor-health-wellness-1200x480.jpg)] bg-cover bg-center blur-sm filter'></div>

      {/* Content Overlay */}
      <div className='relative h-[calc(94dvh)] overflow-hidden bg-slate-50/80 p-4 sm:p-6 md:p-8'>
        <div className='mx-auto mb-12 max-w-4xl text-center'>
          <h1 className='bg-gradient-to-r from-[#1A3973] to-[#4F80E1] bg-clip-text pb-2 text-5xl font-bold text-transparent md:text-6xl'>
            Your Health, Your Sanctuary
          </h1>
          <p className='mt-2 text-lg text-gray-500'>
            Experience premium care, tailored to your journey. Choose your path below.
          </p>
        </div>

        <Tabs defaultValue='consultant' className='mx-auto max-w-7xl'>
          <TabsList className='grid h-auto w-full grid-cols-2 rounded-xl bg-gray-200/75 p-1.5'>
            <TabsTrigger
              value='consultant'
              className='rounded-lg py-2.5 text-base font-semibold text-gray-600 transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-[#1A3973] data-[state=active]:shadow-md'
            >
              Expert Consultation
            </TabsTrigger>
            <TabsTrigger
              value='service'
              className='rounded-lg py-2.5 text-base font-semibold text-gray-600 transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-[#1A3973] data-[state=active]:shadow-md'
            >
              Clinical Services
            </TabsTrigger>
          </TabsList>

          {/* ========================================= */}
          {/* === TAB 1: CONSULTATION === */}
          {/* ========================================= */}
          <TabsContent value='consultant' className='mt-8'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
              {/* CARD GIỚI THIỆU LỚN */}
              <div className='rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl lg:col-span-2'>
                <div className='mb-4 flex items-center gap-3 text-[#1A3973]'>
                  <MessageSquareQuote size={28} />
                  <h2 className='text-3xl font-bold'>A Private Conversation, A Clearer Path</h2>
                </div>
                <p className='text-lg text-gray-600'>
                  Our consultations are more than just appointments; they are dedicated moments for you to be heard. In
                  a safe, non-judgmental space, our specialists will listen to your concerns, answer your questions,
                  empower you with the knowledge to make informed decisions about your health.
                </p>
              </div>

              {/* CARD LỜI HỨA */}
              <div className='rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
                <h3 className='mb-4 text-lg font-bold text-[#1A3973]'>Our Guarantees:</h3>
                <ul className='space-y-4'>
                  <li className='flex gap-3'>
                    <Lock className='mt-1 shrink-0 text-green-500' />
                    <div>
                      <h4 className='font-semibold'>Absolute Confidentiality</h4>
                      <p className='text-sm text-gray-500'>Your privacy is our highest priority.</p>
                    </div>
                  </li>
                  <li className='flex gap-3'>
                    <Heart className='mt-1 shrink-0 text-green-500' />
                    <div>
                      <h4 className='font-semibold'>Empathetic Approach</h4>
                      <p className='text-sm text-gray-500'>You will be treated with respect and kindness.</p>
                    </div>
                  </li>
                  <li className='flex gap-3'>
                    <UserCheck className='mt-1 shrink-0 text-green-500' />
                    <div>
                      <h4 className='font-semibold'>Qualified Experts</h4>
                      <p className='text-sm text-gray-500'>Receive advice from certified professionals.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* CARD QUY TRÌNH */}
              <div className='rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
                <div className='mb-4 flex items-center gap-3 text-[#1A3973]'>
                  <ListOrdered />
                  <h3 className='text-xl font-bold'>How It Works</h3>
                </div>
                <ol className='relative space-y-6'>
                  <li>
                    <h4 className='mb-1 font-semibold'>1. Book Securely</h4>
                    <p className='text-sm text-gray-500'>
                      Choose a time that fits your schedule through our confidential online portal.
                    </p>
                  </li>
                  <li>
                    <h4 className='mb-1 font-semibold'>2. Connect & Share</h4>
                    <p className='text-sm text-gray-500'>
                      Engage in a one-on-one video or phone call with your dedicated specialist.
                    </p>
                  </li>
                  <li>
                    <h4 className='mb-1 font-semibold'>3. Receive Your Plan</h4>
                    <p className='text-sm text-gray-500'>
                      Get a personalized summary and clear next steps sent directly to you.
                    </p>
                  </li>
                </ol>
              </div>

              {/* CARD CTA LỚN */}
              <div className='relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#1A3973]/90 to-[#122850]/90 p-8 text-center text-white shadow-xl shadow-blue-900/20 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl lg:col-span-2'>
                <SubtleGridPattern />
                <div className='relative z-10'>
                  <h2 className='mb-3 text-4xl font-extrabold'>Ready to Gain Clarity?</h2>
                  <p className='mx-auto mb-8 max-w-md text-blue-200/80'>
                    Take the first step towards peace of mind. Our specialists are waiting to help.
                  </p>
                  <Link to="/book-consultant" className="w-auto bg-gradient-to-r from-[#1A3973] to-[#4F80E1] hover:from-[#15305f] hover:to-[#3a6ad0] text-white text-lg font-semibold rounded-full py-3 px-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer flex items-center justify-center gap-2">
                      <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                      <div className="relative flex items-center justify-center">
                        <FaHeartbeat className="mr-2" /><span>Book Consultant</span>
                      </div>
                    </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ===================================== */}
          {/* === TAB 2: SERVICES=== */}
          {/* ===================================== */}
          <TabsContent value='service' className='mt-8'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
              <div className='rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl lg:col-span-2'>
                <div className='mb-6 flex items-center gap-3 text-[#1A3973]'>
                  <Sparkles />
                  <h2 className='text-3xl font-bold'>Our Service Categories</h2>
                </div>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                  {serviceCategories.map((s) => (
                    <div
                      key={s.name}
                      className='flex flex-col rounded-lg bg-slate-100/70 p-5 transition-all hover:bg-white hover:shadow-sm'
                    >
                      <div className='mb-2 flex items-center gap-3'>
                        <div className='rounded-lg bg-blue-200 p-2 text-blue-800'>
                          <s.icon size={20} />
                        </div>
                        <h4 className='font-semibold text-gray-800'>{s.name}</h4>
                      </div>
                      <p className='text-sm text-gray-600'>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
                <div className='mb-4 flex items-center gap-3 text-[#1A3973]'>
                  <HelpCircle />
                  <h3 className='text-xl font-bold'>Quick FAQ</h3>
                </div>
                <div className='space-y-4 text-sm'>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Is my appointment confidential?</h4>
                    <p className='text-gray-500'>Absolutely. All bookings and services are 100% private.</p>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>What do I need to prepare?</h4>
                    <p className='text-gray-500'>Just bring your ID and any relevant medical history you may have.</p>
                  </div>
                  <div>
                  <h4 className="font-semibold text-gray-800">Do I need a doctor's referral?</h4>
                  <p className="text-gray-500">No, a referral is not required to book a service with us.</p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                        {/* THAY ĐỔI: Áp dụng style mới cho nút View All Services */}
                        <Link to="/services" className="w-full bg-gradient-to-r from-[#1A3973] to-[#4F80E1] hover:from-[#15305f] hover:to-[#3a6ad0] text-white text-lg font-semibold rounded-full py-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer flex items-center justify-center gap-2">
                          <span className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                          <div className="relative flex items-center justify-center">
                            <Users className="mr-2 h-5 w-5" /><span>View All Services</span>
                          </div>
                        </Link>
                    </div>
              </div>

              <div className='flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#1A3973]/90 to-[#4F80E1]/90 p-8 text-white shadow-xl shadow-blue-500/30 backdrop-blur-sm md:flex-row lg:col-span-3'>
                <div className='text-center md:text-left'>
                  <h2 className='mb-1 text-3xl font-bold'>Take Control of Your Health</h2>
                  <p className='text-blue-200/90'>Booking is simple, secure, and the first step to proactive care.</p>
                </div>
                <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        {/* THAY ĐỔI: Áp dụng style mới cho nút Book Service */}
                        <Link to="/book-service" className="w-full sm:w-auto bg-gradient-to-r from-white/90 to-white hover:from-white hover:to-white text-[#1A3973] text-lg font-semibold rounded-full py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer flex items-center justify-center gap-2">
                          <span className="absolute inset-0 w-full h-full bg-black/10 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                          <div className="relative flex items-center justify-center">
                            <FaHeartbeat className="mr-2" /><span>Book Service</span>
                          </div>
                        </Link>
                        <Link to="/cycles" className="w-full sm:w-auto flex items-center justify-center gap-3 hover:bg-white/10 text-white rounded-full px-6 py-3 font-bold text-lg transition-colors border-2 border-white/60">
                            <ClipboardList className="w-[1.125rem] h-[1.125rem]"/> 
                            <span>Diagnosis</span>
                        </Link>
                    </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default BookingInfoPage
