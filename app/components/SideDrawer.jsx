import React from "react";

import { useCart } from "../Context/CartContext";

function SideDrawer({ onClose, open }) {
 
  // const { totalItems } = useCart();

  const { items, totalItems, totalPrice } = useCart()

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-60 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-black flex ">
          Cart
          {totalItems > 0 && (
            <span className=" text-black text-lg ml-2 w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </h2>

        <button
          onClick={onClose}
          className="text-xl cursor-pointer text-black "
        >
          ✖
        </button>
      </div>

      {totalItems > 0 && (
        //here the Cart items Will be displayed here....
        <div className="w-full max-w-md bg-white h-screen flex flex-col">
          {/* Progress Bar */}
          <div className="px-5 py-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-full bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div>
              <p className="text-xs text-black-600 mt-1 text-black">
                You've earned free shipping
              </p>
            </div>
          </div>

          {/* Scrollable Content */}



   <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-4">

       
          </div>

 


         

          {/* Footer */}
          <div className="border-t bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Subtotal</span>

              <span className="font-bold text-lg">$140</span>
            </div>

            <button className="w-full bg-black text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition">
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Content (YOUR ITEMS KEPT) */}
      <div className="p-6 text-center">
        <p className="mb-6 text-gray-600">
          Your cart is empty. Start shopping!
        </p>

        <div className="space-y-3">
          <button className="w-full bg-black text-black py-2 rounded">
            SHOP WOMENS
          </button>
          <button className="w-full bg-black text-black py-2 rounded">
            SHOP MENS
          </button>
          <button className="w-full bg-black text-black py-2 rounded">
            SHOP SOCKS
          </button>
          <button className="w-full bg-black text-black py-2 rounded">
            SHOP WOMEN'S SALE
          </button>
          <button className="w-full bg-black text-black py-2 rounded">
            SHOP MEN'S SALE
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideDrawer;
