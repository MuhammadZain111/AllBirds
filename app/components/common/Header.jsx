import React from "react";

// ${styles.custom_color}

function Header() {
  return (
    <div
      className={`h-[30vh] pt-1 pb-2 font-serif  text-white rounded-md md:mb-3 flex flex-col items-center justify-center mt-3  `}
    >
      <h2 className="text-2xl leading-tight select-none  sm:text-2xl md:pt-2 md:pb-4 lg:text-2xl xl:text-[2.5rem] flex items-center justify-center ">
        <p>
          <strong>30% Off Your Order When You Spend $140+</strong>
        </p>
      </h2>

      <h2 className="">Discount Automatically Applied at Checkout.</h2>
    </div>
  );
}

export default Header;
