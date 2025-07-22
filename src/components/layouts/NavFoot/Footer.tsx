import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/images/logo2.webp'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const Footer: React.FC = () => {
  const currentUrl = encodeURIComponent(window.location.href)
  const toTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <footer className='bg-[#1A2250] px-6 pt-16 pb-8 text-white'>
      <div className='mx-auto max-w-7xl'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-12'>
          {/* Company Info */}
          <div className='lg:pr-4'>
            <div className='mb-4 flex items-center gap-3'>
              <img src={logo} alt='Care4Gender Logo' className='h-12 w-12 object-contain' />
              <div>
                <h2 className='text-lg font-bold'>Care4Gender</h2>
                <p className='text-sm text-blue-200'>Gender Healthcare</p>
              </div>
            </div>

            <div className='mb-6 text-sm leading-relaxed text-gray-300'>
              <p className='mb-2'>
                <span className='font-medium text-white'>Care4Gender</span> provides comprehensive{' '}
                <span className='text-blue-300'>sexual and reproductive health services</span>
              </p>
              <p className='text-gray-400'>
                with professional medical consultation and dedicated support for your wellness journey.
              </p>
            </div>

            {/* Contact Information */}
            <div className='space-y-2 text-sm text-gray-300'>
              <div className='flex items-center gap-2'>
                <FaPhoneAlt className='flex-shrink-0 text-blue-400' size={14} />
                <a href='tel:+842873005588' className='transition-colors duration-200 hover:text-white'>
                  +84 28 7300 5588
                </a>
              </div>
              <div className='flex items-center gap-2'>
                <FaEnvelope className='flex-shrink-0 text-blue-400' size={14} />
                <a href='mailto:care4gender@fpt.edu.vn' className='transition-colors duration-200 hover:text-white'>
                  care4gender@fpt.edu.vn
                </a>
              </div>
              <div className='flex items-start gap-2'>
                <FaMapMarkerAlt className='mt-1 flex-shrink-0 text-blue-400' size={14} />
                <a
                  href='https://www.google.com/maps/search/?api=1&query=Lot+E2a-7+Street+D1+Long+Thanh+My+Thu+Duc+City+Ho+Chi+Minh+City+Vietnam'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='cursor-pointer text-xs leading-relaxed transition-colors duration-200 hover:text-white'
                >
                  Lot E2a-7, Street D1, Long Thanh My, Thu Duc City, Ho Chi Minh City
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className='lg:pr-2 lg:pl-22'>
            <h3 className='mb-4 font-semibold text-white'>Quick Links</h3>
            <ul className='space-y-3 text-sm text-gray-300'>
              <li>
                <Link onClick={toTop} to='/' className='transition-colors duration-200 hover:text-white'>
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={toTop} to='/blogs' className='transition-colors duration-200 hover:text-white'>
                  Health Articles
                </Link>
              </li>
              <li>
                <Link onClick={toTop} to='/about-us' className='transition-colors duration-200 hover:text-white'>
                  About Us
                </Link>
              </li>
              <li>
                <Link onClick={toTop} to='/ask-question' className='transition-colors duration-200 hover:text-white'>
                  Ask a Question
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className='lg:pr-6 lg:pl-2'>
            <h3 className='mb-4 font-semibold text-white'>Our Services</h3>
            <ul className='space-y-3 text-sm text-gray-300'>
              <li>
                <Link onClick={toTop} to='/book-consultant' className='transition-colors duration-200 hover:text-white'>
                  Sexual Health Consultation
                </Link>
              </li>
              <li>
                <Link onClick={toTop} to='/services' className='transition-colors duration-200 hover:text-white'>
                  Reproductive Health Care
                </Link>
              </li>
              <li>
                <Link onClick={toTop} to='/book-service' className='transition-colors duration-200 hover:text-white'>
                  Book an STIS Test
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Partner */}
          <div className='lg:pl-4'>
            <h3 className='mb-4 font-semibold text-white'>Payment Partner</h3>
            <div className='mb-4'>
              <img
                src='https://payos.vn/docs/img/logo.svg'
                alt='PayOS Logo'
                className='h-12 rounded bg-white object-contain'
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA4MCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzAwN0JGRiIvPgo8dGV4dCB4PSI0MCIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIj5QYXlPUzwvdGV4dD4KPHN2Zz4='
                }}
              />
            </div>
            <p className='mb-3 text-sm text-gray-400'>Secure Payments</p>
            <p className='mb-4 text-xs leading-relaxed text-gray-500'>
              We partner with PayOS to ensure your payments are safe, secure, and processed quickly for all our
              healthcare services.
            </p>

            {/* Operating Hours */}
            <div className='rounded-lg bg-gray-700/30 p-3'>
              <p className='mb-1 text-sm font-semibold text-white'>Operating Hours</p>
              <p className='text-xs text-blue-200'>7:00 AM - 5:00 PM</p>
              <p className='text-xs text-gray-400'>Monday - Saturday</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-12 border-t border-gray-600 pt-8'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-12'>
            {/* Copyright */}
            <div className='lg:pr-4'>
              <p className='text-sm whitespace-nowrap text-gray-400'>
                Copyright Â© 2025 <span className='font-semibold text-red-400'>Care4Gender</span>. All Rights Reserved.
              </p>
            </div>

            {/* Tagline */}
            <div className='lg:pr-2 lg:pl-12'>
              <p className='text-sm font-semibold whitespace-nowrap text-white'>
                Your Health, Our Priority - Professional Care Anytime
              </p>
            </div>

            {/* Operating Hours & Logo */}
            <div className='flex items-center justify-center gap-3 text-sm text-white lg:justify-end lg:pr-6 lg:pl-2'>
              <img src={logo} alt='Care4Gender Logo' className='h-8 w-8 flex-shrink-0 object-contain' />
              <div className='text-center lg:text-right'>
                <p className='text-xs font-semibold whitespace-nowrap'>Available 7AM - 5PM</p>
                <p className='text-xs whitespace-nowrap text-gray-300'>Online Consultation</p>
              </div>
            </div>

            {/* Social Share */}
            <div className='flex items-center justify-start gap-4 lg:pl-4'>
              <span className='text-sm whitespace-nowrap text-gray-400'>Share:</span>
              <div className='flex items-center gap-3'>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-blue-400/10 hover:text-blue-400'
                  title='Share on Facebook'
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent('Check out Care4Gender - Professional Care Anytime!')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-blue-300/10 hover:text-blue-300'
                  title='Share on Twitter'
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-blue-500/10 hover:text-blue-500'
                  title='Share on LinkedIn'
                >
                  <FaLinkedinIn size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer