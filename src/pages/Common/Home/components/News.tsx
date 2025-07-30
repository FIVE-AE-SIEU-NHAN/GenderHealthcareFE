import React, { useEffect, useState, useCallback } from 'react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'
import { FaCalendarAlt, FaHeartbeat } from 'react-icons/fa'
import Autoplay from 'embla-carousel-autoplay'
import { Link } from 'react-router-dom'

const newsPosts = [
  {
    date: 'Jan 5, 2024',
    title: 'Home Care Services Now in Your City',
    excerpt: 'Discover how our certified nurses bring hospital-grade care to the comfort of your home.',
    image: 'https://res.cloudinary.com/dyo6tjmky/image/upload/v1753718375/care4gender/images/c7d5cxtkbcu8yccwf43q.avif'
  },
  {
    date: 'Feb 12, 2024',
    title: 'New Telehealth Features Launched',
    excerpt: 'We’ve expanded our platform to offer seamless video consultations with specialists.',
    image: 'https://res.cloudinary.com/dyo6tjmky/image/upload/v1753718915/care4gender/images/dbxqlp19h8zp4txxnqpy.avif'
  },
  {
    date: 'Mar 8, 2024',
    title: 'Caring for Seniors with Dignity',
    excerpt: 'Explore how we provide compassionate and personalized elderly care plans.',
    image: 'https://res.cloudinary.com/dyo6tjmky/image/upload/v1753719093/care4gender/images/n7yo8vektfimc2waxllu.avif'
  },
  {
    date: 'Apr 22, 2024',
    title: 'Emergency Support Services Expanded',
    excerpt: 'Our team is now equipped to respond to urgent in-home care requests 24/7.',
    image: 'https://res.cloudinary.com/dyo6tjmky/image/upload/v1753719248/care4gender/images/duaus7h8nw8mls8uupv5.avif'
  },
  {
    date: 'May 15, 2024',
    title: 'Pediatric Home Visits Now Available',
    excerpt: 'Introducing child-focused care with our specialized pediatric nursing team.',
    image: 'https://res.cloudinary.com/dyo6tjmky/image/upload/v1753719341/care4gender/images/zfcbyk5yev8cccdhd2vr.avif'
  },
  {
    date: 'Jun 10, 2024',
    title: 'Mental Health Support at Home',
    excerpt: 'New in-home counseling and therapy services tailored to your mental wellness.',
    image: 'https://res.cloudinary.com/dyo6tjmky/image/upload/v1753719467/care4gender/images/ofn10twkbzud6xnqewen.webp'
  },
  {
    date: 'Jul 1, 2024',
    title: 'Nutrition and Wellness Coaching',
    excerpt: 'Holistic care now includes dietary planning and lifestyle coaching sessions.',
    image: 'https://res.cloudinary.com/dyo6tjmky/image/upload/v1753719587/care4gender/images/msumfvnnfdvo80chk6w2.webp'
  },
  {
    date: 'Jul 28, 2024',
    title: 'Free Health Screening Week Announced',
    excerpt: 'Join our community initiative for free basic check-ups and consultations at home.',
    image: 'https://res.cloudinary.com/dyo6tjmky/image/upload/v1753719664/care4gender/images/xkimqu5om4jhcintaogt.jpg'
  }
]

const ToTop = () => window.scrollTo({ top: 0 })

export function News() {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const cardsPerPage = 3
  const pageCount = Math.ceil(newsPosts.length / cardsPerPage)

  const scrollTo = useCallback(
    (pageIndex: number) => {
      if (!api) return
      api.scrollTo(pageIndex)
    },
    [api]
  )

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const slideIndex = api.selectedScrollSnap()
      setSelectedIndex(slideIndex)
    }

    api.on('select', onSelect)
    onSelect()

    // Cleanup event listener on unmount or api change
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <section
      id='news'
      className='relative mx-auto mb-12 max-w-[1400px] px-4 py-20 text-center'
      data-sal='fade'
      data-sal-duration='700'
      data-sal-delay='100'
      data-sal-easing='ease-out-back'
    >
      <div
        className='mb-20 items-center justify-center text-center'
        data-sal='slide-up'
        data-sal-duration='600'
        data-sal-delay='200'
      >
        <p
          className='section-text flex items-center justify-center gap-4'
          data-sal='slide-right'
          data-sal-duration='700'
        >
          <FaHeartbeat /> NEWS & BLOG
        </p>
        <div
          className='font-outfit text-dark-blue text-2xl leading-snug font-semibold text-shadow-md sm:text-3xl md:text-4xl lg:text-5xl'
          data-sal='slide-up'
          data-sal-delay='300'
        >
          <h2>Latest News & Blogs</h2>
        </div>
        <p
          className='mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg md:text-xl'
          data-sal='slide-up'
          data-sal-delay='500'
        >
          Stay updated with the latest news and blogs from our healthcare experts.
        </p>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: cardsPerPage // Scroll 3 cards each time
        }}
        plugins={[
          Autoplay({
            delay: 10000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          })
        ]}
        className='mb-4 w-full'
        data-sal='fade'
        data-sal-duration='600'
        data-sal-delay='300'
      >
        <CarouselContent className='-ml-10 flex h-86 pb-132'>
          {newsPosts.map((post, index) => (
            <CarouselItem key={index} className='basis-full pl-10 sm:basis-1/2 lg:basis-1/3'>
              <Card className='group relative flex h-95 flex-col overflow-visible rounded-xl shadow-md'>
                <div className='relative h-full w-full overflow-hidden rounded-xl'>
                  <img
                    src={post.image}
                    alt={post.title}
                    className='absolute inset-0 h-full w-full rounded-xl object-cover'
                  />
                  <span className='shine group-hover:animate-shine' />
                </div>

                {/* Small Box */}
                <div className='border-light-blue max-w-[cacl(100% - 2rem)] absolute right-20 bottom-[-6rem] left-20 z-10 flex h-55 flex-col justify-between rounded-xl border-b-4 bg-white p-5 shadow-lg'>
                  <div className='text-light-blue mb-2 flex items-center text-sm'>
                    <FaCalendarAlt className='-mt-0.5 mr-2' />
                    {post.date}
                  </div>
                  <h3 className='mb-2 line-clamp-2 overflow-hidden text-left text-lg leading-snug font-semibold text-ellipsis text-gray-900'>
                    {post.title}
                  </h3>
                  <p className='mb-4 line-clamp-2 overflow-hidden text-left text-sm text-ellipsis text-gray-600'>
                    {post.excerpt}
                  </p>
                  <a
                    href='#'
                    className='group text-light-blue relative inline-block text-sm font-bold transition-all duration-300'
                  >
                    <Link to='/blogs' onClick={ToTop}>
                      <span className='transition-all duration-300 group-hover:px-2'>Read More</span>
                    </Link>
                    <span className='ml-1 transition-all duration-300 group-hover:ml-2 group-hover:opacity-0'>
                      &rsaquo;
                    </span>
                    <span className='absolute left-full ml-1 -translate-x-24 opacity-0 transition-all duration-300 group-hover:left-[calc(100%+0.5rem)] group-hover:opacity-100'>
                      --&gt;
                    </span>
                  </a>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Dots */}
      <div className='flex justify-center gap-2'>
        {[...Array(pageCount)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => scrollTo(pageIndex)}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              pageIndex === selectedIndex ? 'bg-[#030D43]' : 'scale-80 bg-gray-300'
            }`}
            aria-label={`Go to slide group ${pageIndex + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default News
