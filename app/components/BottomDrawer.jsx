import React from 'react'


function BottomDrawer() {

  
  return (

<div class="absolute group bg-white ">
 
  <button class="px-4 py-2">Shoes</button>

  {/* <!-- MEGA MENU --> */}
  <div class="absolute left-0 top-full w-screen bg-white shadow-lg hidden group-hover:block">
    
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-8 p-8">
      
      {/* <!-- COLUMN 1 --> */}
      <div>
        <h3 class="font-bold mb-3">MEN'S SHOES</h3>
        <ul class="space-y-2">
          <li><a href="#">Sneakers</a></li>
          <li><a href="#">Slip Ons</a></li>
          <li><a href="#">Sandals</a></li>
        </ul>
      </div>

      {/* <!-- COLUMN 2 --> */}
      <div>
        <h3 class="font-bold mb-3">CUSTOMER FAVORITES</h3>
        <ul class="space-y-2">
          <li><a href="#">Tree Runner</a></li>
          <li><a href="#">Cruiser</a></li>
        </ul>
      </div>

      {/* <!-- IMAGE SECTION --> */}
      <div class="col-span-2">
        <img src="your-image.jpg" class="rounded-lg" />
      </div>

    </div>
  </div>

</div>
  )
}

export default BottomDrawer
