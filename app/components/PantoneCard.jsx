"use client";
import Image from "next/image";

export default function PantoneCard({
  image,
  title,
  subtitle,
  price,
  color,
}) {
  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-[#f5f3ef] p-6 flex flex-col justify-between h-[500px]">



      <div>
        <span className="inline-block bg-[#e5e1d8] text-black text-sm font-semibold px-4 py-2 rounded-full tracking-wide">
          PANTONE COLOR {color}
        </span>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center items-center flex-1">
        <div className="relative w-full h-[200px] md:h-[240px]">
          <Image
            src={image} // replace with your image
            alt="shoe"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* BOTTOM CONTENT */}
      <div className="space-y-3">

        {/* TITLE */}
        <h2 className="text-lg md:text-xl font-semibold tracking-wide">
          {title}
        </h2>

        {/* SUBTITLE */}
        <p className="text-black text-base md:text-lg">
          {subtitle}
        </p>

      
        <div className="flex items-center justify-between mt-4">

      
          <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#7a8fa3]"></div>
          </div>

        
          <span className="text-lg md:text-xl font-semibold text-black ">
            {price}
          </span>

        </div>
      </div>

    </div>
  );
}