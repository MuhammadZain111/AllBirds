"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function TopRightArrowSwiper() {
  

    
    const prevRef = useRef(null);
    const nextRef = useRef(null);

  const slides = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  return (
    <div className="relative w-full h-[500px]">

     
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          ref={prevRef}
          className="bg-black/60 text-white p-2 rounded-full hover:bg-black"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          ref={nextRef}
          className="bg-black/60 text-white p-2 rounded-full hover:bg-black"
        >
          <ChevronRight size={18} />
        </button>
      </div>

   
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className="h-full"
      >
        {slides.map((img, i) => (
          <SwiperSlide key={i}>
            
            <div className="relative w-full h-[500px]">
              <Image
                src={img}
                alt={`slide-${i}`}
                fill
                className="object-cover"
              />
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}