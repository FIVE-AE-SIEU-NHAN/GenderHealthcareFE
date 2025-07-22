import React, { useEffect, useState, useCallback } from 'react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'
import { FaCalendarAlt, FaHeartbeat } from 'react-icons/fa'
import Autoplay from 'embla-carousel-autoplay'
import news from '@/assets/images/new1.jpg'
import { Link } from 'react-router-dom'

const newsPosts = [
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: news
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: news
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: news
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: news
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: news
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: news
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: news
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: news
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
