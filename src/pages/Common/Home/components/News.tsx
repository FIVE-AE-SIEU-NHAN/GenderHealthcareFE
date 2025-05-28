import React, { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { FaCalendarAlt, FaHeartbeat } from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay";
import news from "@/assets/images/new1.jpg"; 

const newsPosts = [
  {
    date: "Mar 20, 2021",
    title: "Get the Home care and nursing service",
    excerpt: "Debitis aut rerum nec sitatoe bus saereve eveniet...",
    image: news,
  },
  {
    date: "Mar 20, 2021",
    title: "Get the Home care and nursing service",
    excerpt: "Debitis aut rerum nec sitatoe bus saereve eveniet...",
    image: news,
  },
  {
    date: "Mar 20, 2021",
    title: "Get the Home care and nursing service",
    excerpt: "Debitis aut rerum nec sitatoe bus saereve eveniet...",
    image: news,
  },
  {
    date: "Mar 20, 2021",
    title: "Get the Home care and nursing service",
    excerpt: "Debitis aut rerum nec sitatoe bus saereve eveniet...",
    image: news,
  },
  {
    date: "Mar 20, 2021",
    title: "Get the Home care and nursing service",
    excerpt: "Debitis aut rerum nec sitatoe bus saereve eveniet...",
    image: news,
  },
  {
    date: "Mar 20, 2021",
    title: "Get the Home care and nursing service",
    excerpt: "Debitis aut rerum nec sitatoe bus saereve eveniet...",
    image: news,
  },
  {
    date: "Mar 20, 2021",
    title: "Get the Home care and nursing service",
    excerpt: "Debitis aut rerum nec sitatoe bus saereve eveniet...",
    image: news,
  },
  {
    date: "Mar 20, 2021",
    title: "Get the Home care and nursing service",
    excerpt: "Debitis aut rerum nec sitatoe bus saereve eveniet...",
    image: news,
  },
];

export function News() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const cardsPerPage = 3;
  const pageCount = Math.ceil(newsPosts.length / cardsPerPage);

  const scrollTo = useCallback(
    (pageIndex: number) => {
      if (!api) return;
      api.scrollTo(pageIndex);
    },
    [api]
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const slideIndex = api.selectedScrollSnap();
      setSelectedIndex(slideIndex);
    };

    api.on("select", onSelect);
    onSelect();

    // Cleanup event listener on unmount or api change
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section
      id="news"
      className="py-20 text-center max-w-[1400px] mx-auto px-4 mb-12 relative"
      data-sal="fade"
      data-sal-duration="700"
      data-sal-delay="100"
      data-sal-easing="ease-out-back"
    >
      <div className="text-center mb-20"
        data-sal="slide-up"
        data-sal-duration="600"
        data-sal-delay="200">
        <p className="section-text flex gap-4 items-center justify-center" data-sal="slide-right" data-sal-duration="700">
          <FaHeartbeat /> NEWS & BLOG
        </p>
        <div className="font-semibold text-shadow-md font-outfit text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue leading-snug"
          data-sal="slide-up" data-sal-delay="300">
          <h2>
            Latest News & Blogs
          </h2>
        </div>

      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: cardsPerPage, // Scroll 3 cards each time
        }}
        plugins={[
          Autoplay({
            delay: 10000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full mb-6"
        data-sal="fade"
        data-sal-duration="800"
        data-sal-delay="400"
      >
        <CarouselContent className="flex h-86 pb-142 -ml-10">
          {newsPosts.map((post, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 lg:basis-1/3 pl-10"
            >
              <Card className="relative shadow-md rounded-xl overflow-visible flex flex-col h-105">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full absolute inset-0 h-full object-cover rounded-xl"
                />

                <div
                  className="absolute left-20 right-20 bottom-[-6rem] bg-white rounded-xl p-5 shadow-lg z-10 border-b-4 border-light-blue h-60"
                  style={{ maxWidth: "calc(100% - 2rem)" }}
                >
                  <div className="text-light-blue text-sm flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 -mt-0.5" />
                    {post.date}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-2 text-left overflow-hidden text-ellipsis line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 text-left overflow-hidden text-ellipsis line-clamp-2">
                    {post.excerpt}
                  </p>
                  <a
                    href="#"
                    className="group relative inline-block text-light-blue text-sm font-bold transition-all duration-300"
                  >
                    <span className="transition-all duration-300 group-hover:px-2">Read More</span>
                    <span className="ml-1 transition-all duration-300 group-hover:ml-2 group-hover:opacity-0">
                      &rsaquo;
                    </span>
                    <span className="-translate-x-5 ml-1 left-full absolute opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:left-[calc(100%+0.5rem)]">
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
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(pageCount)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => scrollTo(pageIndex)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${pageIndex === selectedIndex ? "bg-[#030D43]" : "bg-gray-300 scale-80"
              }`}
            aria-label={`Go to slide group ${pageIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default News;
