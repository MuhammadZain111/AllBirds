import React from "react";



const AboutSliderCard = ({ image, title, description }) => {
  
  
  

  return (
     <div className="w-[300px] rounded-xl overflow-hidden shadow-md bg-white">
      
    

      <div className="h-[200px] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

    
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutSliderCard 