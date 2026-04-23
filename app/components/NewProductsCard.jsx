import React from "react";
import Image from "next/image";




const NewProductsCard = ({ product }) => {
  
  return (
    <div className="w-[500px] h-[800px] rounded-xl overflow-hidden cursor-pointer group relative">

      <Image
        src={product.image}
        alt={product.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/10"></div>

      <div className="absolute bottom-5 w-full px-4 text-white">
        <h2 className="text-lg font-semibold mb-3">
          {product.title}
        </h2>

        <div className="flex gap-3 mb-2">
          <button className="flex-1 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition">
            Buy Now
          </button>

          <button className="flex-1 border border-white text-white rounded-xl hover:bg-white hover:text-black transition">
            Details
          </button>
        </div>
      </div>

    </div>
  );
};

export default NewProductsCard;