"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";

export default function CustomSlider() {
  const swiperRef = useRef(null);
  const [isRight, setIsRight] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });  
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e) => {
    const mid = window.innerWidth / 2;
    setIsRight(e.clientX > mid);
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (!swiperRef.current) return;
    isRight
      ? swiperRef.current.slideNext()
      : swiperRef.current.slidePrev();
  };




  return (
    <div className="relative w-full  cursor-none"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
       onMouseEnter={() => setIsInside(true)}
       onMouseLeave={() => setIsInside(false)}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        centeredSlides={true}       
        slidesPerView={2.5}        
        spaceBetween={30}           
        loop={true}
        allowTouchMove={false}          
         simulateTouch={false}         
        touchStartPreventDefault={false}
      >



        <SwiperSlide className="flex justify-center">
         
          <Image
            src="/images/image_36.jpg"
            width={600}
            height={700}
            alt="shoe"
            className="object-cover rounded-xl"
          />
           
        <div className="text- black" > 
        <div className="text-black" > 
        <h3 className="flex items-center justify-center font-serif text-[30px]/7.5 text-black md:text-[40px]/10 ">Allbirds Flip Flop</h3> 
        </div> 
        <div className="flex items-center justify-center gap-2.5 text-black mt-2"> <p className ="">Mid Yellow</p> <span>$25</span> </div> 
        <div className="flex flex-col md:flex-row justify-center items-center "> <button className=" border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black">Shop Men </button> <button className="border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black">Shop Men </button> 
        </div>
   </div>

        </SwiperSlide>

        <SwiperSlide className="flex justify-center">
          <Image
            src="/images/image_37.jpg"
            width={600}
            height={700}
            alt="shoe"
            className="object-cover rounded-xl"
          />
        
        <div className="text- black" > 
        <div className="text-black" > 
        <h3 className="flex items-center justify-center font-serif text-[30px]/7.5 text-black md:text-[40px]/10 ">Allbirds Flip Flop</h3> 
        </div> 
        <div className="flex items-center justify-center gap-2.5 text-black mt-2"> <p className ="">Mid Yellow</p> <span>$25</span> </div> 
        <div className="flex flex-col md:flex-row justify-center items-center "> <button className=" border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black">Shop Men </button> <button className="border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black">Shop Men </button> 
        </div>
        </div>
        </SwiperSlide>

        <SwiperSlide className="flex justify-center">
          <Image
            src="/images/image_38.jpg"
            width={600}
            height={700}
            alt="shoe"
            className="object-cover rounded-xl"
          />
           
           <div className="text- black" > 
          <div className="text-black" > 
          <h3 className="flex items-center justify-center font-serif text-[30px]/7.5 text-black md:text-[40px]/10 ">Allbirds Flip Flop</h3> 
            </div> 
            <div className="flex items-center justify-center gap-2.5 text-black mt-2"> <p className ="">Mid Yellow</p> <span>$25</span> </div> 
             <div className="flex flex-col md:flex-row justify-center items-center "> <button className=" border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black">Shop Men </button> <button className="border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black">Shop Men </button> 
           </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Cursor */}
      {isInside && (
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: cursorPos.x - 40,
          top: cursorPos.y - 40,
        }}
      >
        <div className="w-20 h-20 rounded-full border flex items-center justify-center bg-white/70 backdrop-blur">
          {isRight ? "→" : "←"}
        </div>
      </div>
      )}
    </div>
  );
}