import React from 'react'

const RequireLoginBooking: React.FC = () => {
  return (
    <div>
      <div>
        {/* Banner */}
        <section className='bg-blue-100 py-0 text-center'>
          <div className='relative w-full'>
            <img src='/images/banner_blog.png' alt='' className='w-full rounded' />
            <div className='absolute inset-0 flex w-full flex-col items-center justify-center bg-[#1A2159]/70'>
              <h2 className='text-6xl font-bold text-white'>Our Blogs</h2>
              <p className='mt-3 text-sm'>
                <span className='text-white'>Home</span>
                <span className='text-[#55AEFF]'> &gt; BookingService</span>
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Form Require Login*/}
      <div>
        <form className='mx-auto mt-15 mb-20 w-full max-w-2xl space-y-6 rounded-xl bg-white p-6 shadow-2xl'>
          <div className='text-center text-4xl font-bold text-[#1C2359]'>Reproductive health care services</div>
          <div className='text-center-left text-xl font-bold text-[#1C2359]'>
            The professionalism and efficiency of the clinic made my visit smooth and stress-free. I highly recommend
            Dr. Jakob Smith and Medova to anyone in need of top-quality medical care.
          </div>
          <div className='text-center text-sm font-bold text-[#1C2359]'>
            Please log in or register to use sexual health care and counseling services.
          </div>
          <div className='flex items-center justify-center gap-3'>
            <a
              href='/login'
              className='bg-dark-blue rounded-button px-6 py-2 font-semibold text-white transition duration-200 hover:bg-blue-800'
            >
              Log In
            </a>
            <p className='my-0 flex items-center font-semibold text-[#4A4A4A]'>or</p>
            <a
              href='/signup'
              className='border-dark-blue text-dark-blue rounded-button border-2 px-4 py-2 font-semibold transition duration-200 hover:bg-blue-50'
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RequireLoginBooking
