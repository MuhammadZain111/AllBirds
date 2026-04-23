"use client";
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import AboutSliderCard from "./AboutSliderCard";



function AboutSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const products = [
    { image: "/images/shoes1.png", title: "MEN'S CANVAS CRUISER", description: "Cultured Blue" },
    { image: "/images/shoes2.png", title: "MEN'S CANVAS CRUISER", description: "Adventurous Auburn" },
    { image: "/images/shoes3.png", title: "MEN'S CANVAS CRUISER", description: "Adventurous Auburn" },
    { image: "/images/shoes2.png", title: "MEN'S CANVAS CRUISER", description: "Adventurous Auburn" },
  ];

  return (
    <div className="relative w-full h-[700px] mt-4 bg-white px-3">



      <div className="flex items-center justify-between">
        <button className="border-b-2 border-transparent hover:border-black text-black uppercase">
          Our Journey from New Zealand
        </button>

      
        <div className="flex gap-2 absolute top-4 right-4 z-[999]">
          <button
            ref={prevRef}
            className="bg-white text-black p-2 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            ref={nextRef}
            className="bg-white text-black p-2 rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        
        spaceBetween={20}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.2 },
          1280: { slidesPerView: 4 },
        }}
        className="h-full mt-10"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <AboutSliderCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AboutSlider;