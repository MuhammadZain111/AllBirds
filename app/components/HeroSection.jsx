"use client";
import "../globals.css";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import styles from  "./hero.module.css"

export default function HeroSection() {


  const swiperRef = useRef(null);

  const DURATION = 4000;

  const slides = [
    { id: 1, img: "/images/hero.png.webp" },
    { id: 2, img: "/images/hero.png.webp" },
    { id: 3, img: "/images/hero.png.webp" },
  ];

  const [progress, setProgress] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(true);


  useEffect(() => {
    if (!isPlaying) return;

    let start = performance.now();
    let frame;

    const animate = (time) => {
      const elapsed = time - start;
      const percent = elapsed / DURATION;

      if (percent >= 1) {
        start = performance.now();
        setProgress(0);
      } else {
        setProgress(percent);
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [activeIndex, isPlaying]);

 
  const togglePlay = () => {
    if (!swiperRef.current) return;

    if (isPlaying) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full overflow-x-hidden">

     <div className={`h-[30vh] pt-1 pb-2 font-serif  text-white rounded-md md:mb-3 flex flex-col items-center justify-center mt-3  ${styles.custom_color}`} >
     
      <h2 className="text-2xl leading-tight select-none  sm:text-2xl md:pt-2 md:pb-4 lg:text-2xl xl:text-[2.5rem] flex items-center justify-center ">
       <p>
       <strong >
        30% Off Your Order When You Spend $140+
       </strong>
       </p>
      
       </h2>

       <h2 className="">Discount Automatically Applied at Checkout.</h2>

 </div>

  
      <div className="relative w-full h-[70vh] md:h-[90vh]">

     
        <div className="absolute bottom-3 left-3 right-3 z-20 flex gap-2">
          {slides.map((_, index) => (
            <div key={index} className="flex-1 h-[3px] bg-gray-400/40 overflow-hidden">
              
              <div
                className="h-full bg-white origin-left transition-all"
                style={{
                  transform:
                    index === activeIndex
                      ? `scaleX(${progress})`
                      : index < activeIndex
                      ? "scaleX(1)"
                      : "scaleX(0)",
                }}
              />
            </div>
          ))}
        </div>

  
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: DURATION,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
            setProgress(0);
          }}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">

                <Image
                  src={slide.img}
                  alt="Hero"
                  fill
                  priority
                  className="object-cover"
                />

            
                <div className="absolute inset-0 flex flex-col justify-end items-start md:items-end p-6 md:p-16">
                  <h1 className="text-white text-xl md:text-3xl mb-4">
                    The New Canvas Cruiser Collection
                  </h1>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-white text-black px-5 py-2 hover:bg-black rounded-md hover:text-white cursor-pointer    ">
                      Shop Men
                    </button>
                    <button className="bg-white text-black px-5 py-2 hover:bg-black rounded-md hover:text-white cursor-pointer">
                      Shop Women
                    </button>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

  
        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-4 z-20 bg-white px-4 py-2 text-sm"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}