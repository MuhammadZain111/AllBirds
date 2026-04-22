import React from 'react'





function SideDrawer({onClose,open}) {

  return (
     
<div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-60 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
        
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Cart (0)</h2>

            <button
              onClick={onClose}
              className="text-xl cursor-pointer"
            >
              ✖
            </button>
          </div>

          {/* Content (YOUR ITEMS KEPT) */}
          <div className="p-6 text-center">
            <p className="mb-6 text-gray-600">
              Your cart is empty. Start shopping!
            </p>

            <div className="space-y-3">
              <button className="w-full bg-black text-white py-2 rounded">
                SHOP WOMENS
              </button>
              <button className="w-full bg-black text-white py-2 rounded">
                SHOP MENS
              </button>
              <button className="w-full bg-black text-white py-2 rounded">
                SHOP SOCKS
              </button>
              <button className="w-full bg-black text-white py-2 rounded">
                SHOP WOMEN'S SALE
              </button>
              <button className="w-full bg-black text-white py-2 rounded">
                SHOP MEN'S SALE
              </button>
            </div>
          </div>

       </div>

  
  )
}

export default SideDrawer
