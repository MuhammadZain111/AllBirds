"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function StorySlider() {
  const slides = [
    {
      img1: "/images/image1.jpg",
      img2: "/images/image2.jpg",
      img3: "/images/image3.jpg",
      img4: "/images/image4.jpg",
    },
    {
      img1: "/images/5.jpg",
      img2: "/images/6.jpg",
      img3: "/images/7.jpg",
      img4: "/images/8.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-auto lg:h-[80vh] mt-2">

      {/* LEFT BIG IMAGE */}
      <div className="lg:col-span-2 relative w-full h-[400px] lg:h-full overflow-hidden rounded-xl">
        <Image
          src={slides[activeIndex].img1}
          alt="image"
          fill
          className="object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:col-span-3 grid grid-rows-2 gap-6 h-[600px] lg:h-full">

        {/* TOP FULL WIDTH */}
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <Image
            src={slides[activeIndex].img2}
            alt="image"
            fill
            className="object-cover"
          />
        </div>

        {/* BOTTOM 2 IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">

          <div className="relative w-full h-[250px] md:h-full overflow-hidden rounded-xl">
            <Image
              src={slides[activeIndex].img3}
              alt="image"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-full h-[250px] md:h-full overflow-hidden rounded-xl">
            <Image
              src={slides[activeIndex].img4}
              alt="image"
              fill
              className="object-cover"
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default StorySlider;