import React from 'react'





function Footer() {

    
    

  
    return (
    <div>
      
  <footer class="bg-[#1c1c1c] text-gray-300 px-6 md:px-16 py-12">

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">


    <div class="leftdiv lg:col-span-2 space-y-6">

      <h3 class="text-sm tracking-widest text-gray-400">
        SUBSCRIBE TO OUR EMAILS
      </h3>

      
      <div class="flex bg-gray-200 rounded-full overflow-hidden w-full max-w-md">
        <input
          type="email"
          placeholder="Email Address"
          class="flex-1 px-4 py-3 text-black outline-none"
        />
        <button class="px-6 text-black font-semibold">
          SIGN UP
        </button>
      </div>

      {/* <!-- SOCIAL --> */}
      <div>
        <h3 class="text-sm tracking-widest text-gray-400 mb-4">
          FOLLOW THE FLOCK
        </h3>

        <div class="flex space-x-4 text-xl">
          <i class="fab fa-instagram border p-2 rounded-full"></i>
          <i class="fab fa-pinterest border p-2 rounded-full"></i>
          <i class="fab fa-facebook-f border p-2 rounded-full"></i>
          <i class="fab fa-x-twitter border p-2 rounded-full"></i>
          <i class="fab fa-tiktok border p-2 rounded-full"></i>
          <i class="fab fa-youtube border p-2 rounded-full"></i>
        </div>
      </div>

      {/* <!-- CERTIFIED --> */}
      <div class="flex items-center gap-3 mt-6">
        <div class="border rounded-full w-12 h-12 flex items-center justify-center">
          B
        </div>
        <span>US</span>
      </div>

    </div>

    {/* <!-- HELP --> */}
    <div>
      <h4 class="text-sm text-gray-400 mb-4">HELP</h4>
      <ul class="space-y-2 text-sm">
        <li>Live Chat</li>
        <li>Call Us</li>
        <li>Text Us</li>
        <li>help@allbirds.com</li>
        <li>FAQ/Contact Us</li>
        <li>Returns/Exchanges</li>
      </ul>
    </div>

    {/* <!-- SHOP --> */}
    <div>
      <h4 class="text-sm text-gray-400 mb-4">SHOP</h4>
      <ul class="space-y-2 text-sm">
        <li>Men's Shoes</li>
        <li>Women's Shoes</li>
        <li>Men's Apparel</li>
        <li>Women's Apparel</li>
        <li>Socks</li>
        <li>Refer a Friend</li>
      </ul>
    </div>

    {/* <!-- COMPANY --> */}
    <div>
      <h4 class="text-sm text-gray-400 mb-4">COMPANY</h4>
      <ul class="space-y-2 text-sm">
        <li>Store Locator</li>
        <li>Our Story</li>
        <li>Our Materials</li>
        <li>Sustainability</li>
        <li>Investors</li>
        <li>Shoe Care</li>
        <li>Affiliates</li>
        <li>Bulk Orders</li>
      </ul>
    </div>

    {/* <!-- EXTRA --> */}
    <div>
      <h4 class="text-sm text-gray-400 mb-4">&nbsp;</h4>
      <ul class="space-y-2 text-sm">
        <li>Press</li>
        <li>Careers</li>
        <li>Responsible Disclosure</li>
        <li>California Transparency Act</li>
        <li>Community Offers</li>
        <li>Our Blog</li>
        <li>Patents</li>
        <li>Wholesale Terms</li>
      </ul>
    </div>

  </div>

  {/* <!-- BOTTOM BAR --> */}
  <div class="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-400 gap-4">

    <p>© 2025 Allbirds, Inc. All Rights Reserved</p>

    <div class="flex flex-wrap gap-6">
      <span>Refund policy</span>
      <span>Privacy policy</span>
      <span>Terms of service</span>
      <span>Do Not Sell My Personal Information</span>
    </div>

  </div>

</footer>
    </div>
  )
}

export default Footer


