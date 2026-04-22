"use client"
import React from "react";
import Image from "next/image";



const SliderCard = ({ image, title, buttons, bg }) => {
  return (
    <div
      className={`group relative w-full h-[350px] md:h-[500px] overflow-hidden rounded-2xl ${bg} rounded-md transition-all duration-400 ease-in-out hover:rounded-[300px] `}
    >
     
     <div className="relative w-[400px] h-[100px]">
     <Image src="/images/image _37.jpg" alt={title} width={400} height={100}
       className="object-contain z-0"
        />
     </div>
   
  
      <div className=" relative z-10 flex flex-col items-center justify-center h-full ">


      <div className="text-white text-sm px-3 py-1 rounded-full transition-all duration-300 hover:rounded-full ">{title}</div>


        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className="text-white border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black  hover:cursor-pointer opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0  mt-2"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};


export default function Slider() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">

      <SliderCard
        image="/images/shoes1.png"
        title="NEW ARRIVALS"
        bg="bg-[#5b7280]"
        buttons={["Explore", "Shop Now"]}
      />

      <SliderCard
        image="/images/shoes2.png"
        title="MENS"
        bg="bg-[#4a4343]"
        buttons={["Shop Men", "View Collection"]}
      />

      <SliderCard
        image="/images/shoes3.png"
        title="WOMENS"
        bg="bg-[#8b6b6b]"
        buttons={["Shop Women", "New Styles"]}
      />

      <SliderCard
        image="/images/shoes4.png"
        title="BEST SELLERS"
        bg="bg-[#7c867c]"
        buttons={["Shop Men", "Shop Women"]}
      />
    </div>
  );
}