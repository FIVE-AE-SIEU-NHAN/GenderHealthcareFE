import BookingForm from "./BookingForm";

const BookingService: React.FC = () => {
  return (
    <div>
      <div className="mb-15">
                {/* Banner */}
                <section className='bg-blue-100 py-0 text-center'>
                    <div className='relative w-full'>
                      <img src='/images/banner_blog.png' alt='' className='rounded w-full' />
                      <div className='absolute inset-0 w-full bg-[#1A2159]/70 flex flex-col items-center justify-center'>
                        <h2 className='text-6xl font-bold text-white'>BookingForms</h2>
                        <p className='text-sm mt-3'>
                          <span className='text-white'>Home</span>
                          <span className='text-[#55AEFF]'> &gt; BookingForms</span>
                        </p>
                      </div>
                    </div>
                  </section>

      </div>
      <div className="mb-15"><BookingForm /></div>
      
    </div>
  );
};

export default BookingService;