import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { FaHeartbeat, FaPhone, FaFacebookF, FaInfoCircle } from 'react-icons/fa'
import Autoplay from 'embla-carousel-autoplay'
import doctor from '@/assets/images/bacsi3.jpg'

type Doctor = {
  name: string
  specialty: string
  image: string
}

const doctors: Doctor[] = [
  {
    name: 'Dr. Julia Jany',
    specialty: 'Gynecology Specialist',
    image: '/images/bs3.webp'
  },
  {
    name: 'Dr. Michel Liu',
    specialty: 'Heart Specialist',
    image: '/images/bs4.webp'
  },
  {
    name: 'Dr. Jesmine Ruby',
    specialty: 'Neurology Specialist',
    image: '/images/bs5.webp'
  },
  {
    name: 'Dr. bacsi3 Smith',
    specialty: 'Cardiology Specialist',
    image: '/images/bs6.webp'
  },
  {
    name: 'Dr. Julia Jany',
    specialty: 'Gynecology Specialist',
    image: '/images/bs7.webp'
  },
  {
    name: 'Dr. Michel Liu',
    specialty: 'Heart Specialist',
    image: doctor
  }
]

const Doctors = () => {
  return (
    <div
      className='mx-auto w-full max-w-[1400px] px-4 py-10'
      data-sal='fade'
      data-sal-duration='700'
      data-sal-delay='100'
      data-sal-easing='ease-out-back'
    >
      <div className='mb-22 text-center' data-sal='slide-up' data-sal-duration='600' data-sal-delay='200'>
        <p
          className='section-text flex items-center justify-center gap-4'
          data-sal='slide-right'
          data-sal-duration='700'
        >
          <FaHeartbeat /> MEDICAL EXPERTS
        </p>
        <div
          className='font-outfit text-dark-blue text-2xl leading-snug font-semibold text-shadow-md sm:text-3xl md:text-4xl lg:text-5xl'
          data-sal='slide-up'
          data-sal-delay='300'
        >
          <h2>
            Skilled <span className='font-normal'>Professionals</span>
          </h2>
          <div>
            at{' '}
            <span className='bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 bg-clip-text text-transparent'>
              Care4Gender
            </span>
          </div>
        </div>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          })
        ]}
        className='w-full'
        data-sal='fade'
        data-sal-duration='800'
        data-sal-delay='200'
      >
        <CarouselContent className='flex h-126'>
          {doctors.map((doc, index) => (
            <CarouselItem key={index} className='basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4'>
              <Card className='flex h-[93%] flex-col rounded-2xl p-0 text-center shadow-md'>
                <CardContent className='flex h-full flex-col items-center space-y-4 p-0'>
                  <div className='mb-2 h-[70%] w-full overflow-hidden rounded-t-2xl'>
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className='h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-108 hover:rotate-2'
                    />
                  </div>
                  <div className='flex flex-col items-center justify-between'>
                    <div>
                      <h3 className='text-dark-blue text-lg font-semibold'>{doc.name}</h3>
                      <p className='text-dark-blue text-sm'>{doc.specialty}</p>
                    </div>
                    <div className='mt-6 flex items-center justify-center gap-4'>
                      <div className='hover:text-light-blue cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200'>
                        <FaPhone className='text-xl' />
                      </div>
                      <div className='hover:text-light-blue cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200'>
                        <FaFacebookF className='text-xl' />
                      </div>
                      <div className='hover:text-light-blue cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200'>
                        <FaInfoCircle className='text-xl' />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='mt-4 flex justify-center gap-2 2xl:block'>
          <CarouselPrevious className='bg-dark-blue/10 hover:bg-dark-blue/15 text-dark-blue hidden backdrop-blur transition duration-300 hover:-translate-x-0.5 [@media(min-width:1464px)]:grid' />
          <CarouselNext className='bg-dark-blue/10 hover:bg-dark-blue/15 text-dark-blue hidden backdrop-blur transition duration-300 hover:translate-x-0.5 [@media(min-width:1464px)]:grid' />
        </div>
      </Carousel>
    </div>
  )
}
export default Doctors
