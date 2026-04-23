"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PantoneCard from "./PantoneCard";
import {products} from "@/app/data/products"




export default function TopRightArrowSwiper() {
      
    const prevRef = useRef(null);
    const nextRef = useRef(null);

  const slides = [
    "/images/shoes1.png",
    "/images/shoes2.png",
    "/images/shoes3.png",
    "/images/shoes3.png",
    "/images/shoes3.png",
  ];

  return (
    <div className="relative w-full h-[700px] mt-4">

      <div className="  flex items-center justify-between ">
       
      <div className="">
      <button className="transition-border-color pointer-events-auto cursor-pointer border-b-2 border-transparent font-mono text-sm tracking-wider whitespace-nowrap uppercase duration-300 select-none hover:border-black! md:text-base font-medium text-black   " > New Arrivals</button>
      </div>


       <div className="flex absolute top-4 right-4 z-20  "  >
         <button
          ref={prevRef}
          className="bg-black/60 text-white p-2 rounded-full hover:bg-black cursor-pointer   "
        >
          <ChevronLeft size={18} />
          </button>
          
           <button
          ref={nextRef}
          className="bg-black/60 text-white p-2 rounded-full hover:bg-black cursor-pointer   "
        >
          <ChevronRight size={18} />
        
        </button>
       </div>       
      </div>


   
     <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        loop={true}
       onBeforeInit={(swiper) => {
       swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
  }}
  navigation={{
    prevEl: prevRef.current,
    nextEl: nextRef.current,
  }}
  breakpoints={{
     320: {
       slidesPerView: 1,
    },
    640: {
      slidesPerView: 1.2,
    },
    768: {
      slidesPerView: 1.5,
    },
    1024: {
      slidesPerView: 2.2,
    },
    1280: {
      slidesPerView: 4,
    },
     }}
     className="h-full mt-10 "
      >

        {products.map((item,index) => (
        <SwiperSlide >
            
          <PantoneCard key={index} {...item} />
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}