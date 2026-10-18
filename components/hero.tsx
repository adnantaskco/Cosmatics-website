import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


interface BannerSlide {
  id: number
  imageUrl: string
  altText: string
  linkUrl: string
}

const slides: BannerSlide[] = [
  {
    id: 1,
    imageUrl: "https://lavishta.com/wp-content/uploads/2026/02/web-banner-2-1536x864.jpg", // Replace with your banner image path
    altText: "Free Delivery on orders over 3,000 BDT",
    linkUrl: "/shop",
  },
  {
    id: 2,
    imageUrl: "/images/banners/k-beauty-sale.jpg",
    altText: "K-Beauty Skincare Up to 30% Off",
    linkUrl: "/category/k-beauty",
  },
  {
    id: 3,
    imageUrl: "/images/banners/new-arrivals.jpg",
    altText: "New Makeup Arrivals",
    linkUrl: "/shop?filter=new",
  },
]

export function ImageHeroCarousel() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4 md:pl-74">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative group"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <a href={slide.linkUrl} className="block relative w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl ">
                <img
                  src={slide.imageUrl}
                  alt={slide.altText}
                  
                  className=" transition-transform duration-300"
                  
                />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation Buttons (Visible on Hover) */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 border-none " />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 border-none " />
      </Carousel>
    </section>
  )
}