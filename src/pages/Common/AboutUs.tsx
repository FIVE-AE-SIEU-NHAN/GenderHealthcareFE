import React from 'react'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaHeartbeat } from 'react-icons/fa'
import Doctors from '@/pages/Common/Home/components/Doctors'

const coreValues = [
  {
    title: 'Comprehensive Gender Care at Care4Gender',
    image:
      'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description:
      'We provide inclusive and comprehensive healthcare services for all gender identities, ensuring safe and respectful treatment for everyone.'
  },
  {
    title: 'Confidential Consultation at Care4Gender',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description:
      'Private and confidential consultations with experienced specialists who understand gender-specific health needs and concerns.'
  },
  {
    title: 'Expert Sexual Health at Care4Gender',
    image:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description:
      'Professional sexual and reproductive health services including STI testing, contraception advice, and fertility consultations.'
  }
]

const testimonial = {
  name: 'Nguyen Thi Mai',
  role: 'Patient',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  message:
    'Care4Gender provided me with exceptional support during my health journey. The doctors were understanding, professional, and made me feel completely comfortable discussing sensitive topics. I highly recommend their services to anyone seeking quality gender healthcare.'
}

export default function AboutUsPage() {
  return (
    <div className='bg-gray-50'>
      {/* Core Values Section */}
      <section className='px-4 py-20'>
        <div className='mx-auto max-w-6xl'>
          {/* Header */}
          <div className='mb-16 text-center'>
            <p className='section-text flex items-center justify-center gap-4'>
              <FaHeartbeat /> CARE4GENDER VALUES
            </p>
            <div className='font-outfit text-dark-blue text-2xl leading-snug font-semibold text-shadow-md sm:text-3xl md:text-4xl lg:text-5xl'>
              <h2>
                Our Core <span className='font-normal'>Values</span>
              </h2>
              <div>
                at{' '}
                <span className='bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 bg-clip-text text-transparent'>
                  Care4Gender
                </span>
              </div>
            </div>
            <p className='mx-auto mt-4 max-w-3xl text-lg text-gray-600'>
              Committed to providing inclusive, respectful, and comprehensive healthcare for all gender identities
            </p>
          </div>

          {/* Values Grid */}
          <div className='grid gap-8 md:grid-cols-3'>
            {coreValues.map((value) => (
              <div
                key={value.title}
                className='overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'
              >
                <div className='h-64 overflow-hidden'>
                  <img
                    src={value.image}
                    alt={value.title}
                    className='h-full w-full object-cover transition-transform duration-300 hover:scale-110'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='mb-3 text-xl font-bold text-gray-900'>{value.title.split(' at ')[0]}</h3>
                  <p className='text-sm leading-relaxed text-gray-600'>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-20'>
        {/* Background avatars */}
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute top-20 left-10 h-16 w-16 rounded-full bg-blue-200'></div>
          <div className='absolute top-40 right-20 h-12 w-12 rounded-full bg-purple-200'></div>
          <div className='absolute bottom-20 left-20 h-14 w-14 rounded-full bg-pink-200'></div>
          <div className='absolute right-10 bottom-40 h-16 w-16 rounded-full bg-indigo-200'></div>
          <div className='absolute top-60 left-1/2 h-10 w-10 rounded-full bg-green-200'></div>
          <div className='absolute right-1/3 bottom-60 h-16 w-16 rounded-full bg-yellow-200'></div>
        </div>

        <div className='relative z-10 mx-auto max-w-4xl text-center'>
          {/* Header */}
          <div className='mb-12'>
            <p className='section-text flex items-center justify-center gap-4'>
              <FaHeartbeat /> PATIENT TESTIMONIALS
            </p>
            <div className='font-outfit text-dark-blue text-2xl leading-snug font-semibold text-shadow-md sm:text-3xl md:text-4xl lg:text-5xl'>
              <h2>
                What Our <span className='font-normal'>Patients Say</span>
              </h2>
              <div>
                About{' '}
                <span className='bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 bg-clip-text text-transparent'>
                  Care4Gender
                </span>
              </div>
            </div>
            <p className='mt-4 text-lg text-gray-600'>Real experiences from our valued patients</p>
          </div>

          {/* Testimonial Card */}
          <div className='relative mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-2xl md:p-12'>
            <div className='absolute -top-6 left-8'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600'>
                <FaQuoteLeft className='text-xl text-white' />
              </div>
            </div>

            <div className='pt-6'>
              <p className='mb-8 text-lg leading-relaxed text-gray-700 italic md:text-xl'>"{testimonial.message}"</p>

              <div className='flex items-center justify-start gap-4'>
                <div className='relative h-16 w-16 overflow-hidden rounded-full bg-gray-200'>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className='h-full w-full object-cover'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const fallback = target.parentNode?.querySelector('.fallback-avatar') as HTMLElement
                      if (fallback) {
                        fallback.style.display = 'flex'
                      }
                    }}
                  />
                  <div className='fallback-avatar absolute inset-0 hidden h-full w-full items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white'>
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className='text-left'>
                  <p className='text-lg font-bold text-gray-900'>{testimonial.name}</p>
                  <p className='text-sm text-gray-500'>{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className='mt-8 flex justify-center gap-4'>
            <button className='flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all duration-300 hover:scale-110 hover:text-blue-600 hover:shadow-xl'>
              <FaChevronLeft />
            </button>
            <button className='flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all duration-300 hover:scale-110 hover:text-blue-600 hover:shadow-xl'>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <Doctors />
    </div>
  )
}
