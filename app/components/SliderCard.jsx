import React from "react";

const SliderCard = ({ image, title, buttons, bg }) => {
  return (
    <div
      className={`group relative w-full h-[320px] md:h-[380px] overflow-hidden rounded-2xl ${bg} transition-all duration-500`}
    >
      
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-contain scale-90 group-hover:scale-100 transition-transform duration-500"
      />

    
      <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md text-white text-sm px-3 py-1 rounded-full">
        {title}
      </div>

    
      <div className="duration-500 bg-black/40 backdrop-blur-md flex flex-col justify-center items-start gap-3 px-6 overflow-hidden">

        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className="text-white border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition"
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
        image="/shoe1.png"
        title="NEW ARRIVALS"
        bg="bg-[#5b7280]"
        buttons={["Explore", "Shop Now"]}
      />

      <SliderCard
        image="/shoe2.png"
        title="MENS"
        bg="bg-[#4a4343]"
        buttons={["Shop Men", "View Collection"]}
      />

      <SliderCard
        image="/shoe3.png"
        title="WOMENS"
        bg="bg-[#8b6b6b]"
        buttons={["Shop Women", "New Styles"]}
      />

      <SliderCard
        image="/shoe4.png"
        title="BEST SELLERS"
        bg="bg-[#7c867c]"
        buttons={["Shop Men", "Shop Women"]}
      />
    </div>
  );
}