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
            {/* Product Card */}
            <div className="border border-gray-200 rounded-2xl p-4">
              <div className="flex gap-4">
                {/* Product Image */}
                <img
                  src="/shoe.png"
                  alt="shoe"
                  className="w-24 h-24 rounded-xl bg-gray-100 object-contain p-2 flex-shrink-0"
                />

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm truncate text-black">
                        Women's Tree Glider
                      </h3>

                      <p className="text-xs mt-1 text-black  ">
                        Burlwood (Burlwood Sole)
                      </p>

                      <p className="text-xs text-black mt-1">Size: 5.5</p>
                    </div>

                    <p className="font-bold text-sm whitespace-nowrap text-black   ">
                      $140
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <button className="text-xs text-black cursor-pointer hover:text-red-600 underline">
                      Remove
                    </button>

                    <div className="flex items-center border rounded-full overflow-hidden">
                      <button  onClick={() => updateQuantity(item.id, item.quantity - 1) } className="px-3 text-black py-1 hover:bg-gray-100 transition cursor-pointer   ">
                        -
                      </button>

                      <span className="px-3 text-sm font-medium text-black">
                        {totalItems}
                      </span>

                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-black px-3 py-1 hover:bg-gray-100 transition cursor-pointer   ">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Retu
    
    
    rns Protection */}
            <div className="mt-4 bg-stone-100 rounded-2xl p-5">
              <h3 className="font-semibold text-sm text-black    ">
                Returns Protection
              </h3>

              <p className="text-sm text-black mt-2">
                Buy returns protection to qualify for free returns. Does not
                apply to Final Sale items.
              </p>

              <button className="mt-4 w-full bg-black text-white py-3 rounded-full font-medium hover:opacity-90 transition">
                Add • $3
              </button>
            </div>
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
