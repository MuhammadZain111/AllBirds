import React from 'react'
import button from "./Button"
import Image from "./next/image"

const NewProductsCard = ({ image, title }) => {
  return (
    <div className="w-[320px] h-[420px] rounded-xl overflow-hidden cursor-pointer group">
      
    
      <div
        className="w-full h-full bg-cover bg-center relative transform scale-110 transition-transform duration-500 group-hover:scale-100"
        style={{ backgroundImage: `url(${image})` }}
      >

     <Image
        src="/product.jpg"
        alt="product"
        fill
        className="object-cover"
      />



        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="absolute bottom-5 w-full px-4 text-white">
          <h2 className="text-lg font-semibold mb-3">{title}</h2>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-1 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition">
              Buy Now
            </button>

            <button className="flex-1 py-1 border border-white text-white rounded-xl hover:bg-white hover:text-black transition">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductsCard;