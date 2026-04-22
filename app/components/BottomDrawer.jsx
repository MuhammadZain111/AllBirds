import React from 'react'


function BottomDrawer({onClose,open}) {




  return (

<div className={`fixed top-20 w-full  bg-white shadow-lg z-60 transform transition-transform duration-300  group ${open ? "translate-y-0" : "translate-y-full" }`}>
 
  <button className="px-4 py-2">Shoes</button>


  <div className="w-screen bg-white shadow-lg ">
 
     <h3 className="text-black" >Here is the Bottom NavBar </h3>

    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 p-8">
  
           <button
              onClick={onClose}
              className="text-xl cursor-pointer text-black   "
            >
              ✖
            </button>      



      <div>
        <h3 className="font-bold mb-3">MEN'S SHOES</h3>
        <ul className="space-y-2">
          <li><a href="#">Sneakers</a></li>
          <li><a href="#">Slip Ons</a></li>
          <li><a href="#">Sandals</a></li>
        </ul>
      </div>

      {/* <!-- COLUMN 2 --> */}
      <div>
        <h3 className="font-bold mb-3">CUSTOMER FAVORITES</h3>
        <ul className="space-y-2">
          <li><a href="#">Tree Runner</a></li>
          <li><a href="#">Cruiser</a></li>
        </ul>
      </div>

      {/* <!-- IMAGE SECTION --> */}
      <div className="col-span-2">
        <img src="your-image.jpg" className="rounded-lg" />
      </div>

    </div>
  </div>

</div>
  )
}

export default BottomDrawer
