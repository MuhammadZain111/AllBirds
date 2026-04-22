import React from "react";



export default function ShoeSlider() {
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