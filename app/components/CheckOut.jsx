import React from 'react'

function CheckOut() {
  return (
    <div>
  <div class="min-h-screen bg-gray-50">
     <div class="mx-auto max-w-7xl px-4 py-8 lg:px-8">
       <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">


      <div class="space-y-8">

        <section class="rounded-xl bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-2xl font-semibold">Contact</h2>

          <input
            type="email"
            placeholder="Email"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
          />
        </section>

        {/* <!-- Delivery --> */}
        <section class="rounded-xl bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-2xl font-semibold">Delivery</h2>

          <div class="space-y-4">
            <input
              placeholder="Country / Region"
              class="w-full rounded-lg border px-4 py-3"
            />

            <div class="grid grid-cols-2 gap-4">
              <input
                placeholder="First Name"
                class="rounded-lg border px-4 py-3"
              />
              <input
                placeholder="Last Name"
                class="rounded-lg border px-4 py-3"
              />
            </div>

            <input
              placeholder="Address"
              class="w-full rounded-lg border px-4 py-3"
            />

            <div class="grid grid-cols-3 gap-4">
              <input
                placeholder="City"
                class="rounded-lg border px-4 py-3"
              />

              <select class="rounded-lg border px-4 py-3">
                <option>State</option>
              </select>

              <input
                placeholder="ZIP"
                class="rounded-lg border px-4 py-3"
              />
            </div>
          </div>
        </section>
{/* 
        <!-- Payment --> */}
        <section class="rounded-xl bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-2xl font-semibold">Payment</h2>

          <div class="space-y-4">
            <input
              placeholder="Card Number"
              class="w-full rounded-lg border px-4 py-3"
            />

            <div class="grid grid-cols-2 gap-4">
              <input
                placeholder="MM / YY"
                class="rounded-lg border px-4 py-3"
              />

              <input
                placeholder="CVV"
                class="rounded-lg border px-4 py-3"
              />
            </div>

            <input
              placeholder="Name on Card"
              class="w-full rounded-lg border px-4 py-3"
            />
          </div>
        </section>
      </div>
{/* 
      <!-- RIGHT: Order Summary --> */}
      <aside
        class="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]"
      >
        <div class="flex h-full flex-col rounded-xl bg-white shadow-sm">

          {/* <!-- Scrollable Product Area --> */}
          <div class="flex-1 overflow-y-auto p-6">

            <h2 class="mb-6 text-xl font-semibold">
              Order Summary
            </h2>

            <div class="space-y-4">

              {/* <!-- Item --> */}
              <div class="flex gap-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt=""
                  class="h-20 w-20 rounded-lg object-cover"
                />

                <div class="flex-1">
                  <p class="font-medium">
                    Women's Tree Glider
                  </p>
                  <p class="text-sm text-gray-500">
                    Burlwood Sole
                  </p>
                </div>

                <span class="font-semibold">
                  $700
                </span>
              </div>

              {/* <!-- Duplicate products --> */}
              <div class="flex gap-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt=""
                  class="h-20 w-20 rounded-lg object-cover"
                />

                <div class="flex-1">
                  <p class="font-medium">
                    Recycled Belt Bag
                  </p>
                  <p class="text-sm text-gray-500">
                    Black
                  </p>
                </div>

                <span>$17</span>
              </div>

              {/* <!-- Add many items here --> */}
            </div>
          </div>

          {/* <!-- Fixed Footer Totals --> */}
          <div class="border-t bg-white p-6">

            <div class="mb-4 flex gap-2">
              <input
                placeholder="Discount code"
                class="flex-1 rounded-lg border px-4 py-3"
              />

              <button
                class="rounded-lg bg-black px-5 text-white"
              >
                Apply
              </button>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>$700.00</span>
              </div>

              <div class="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div class="border-t pt-3">
                <div class="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>$700.00</span>
                </div>
              </div>
            </div>

            <button
              class="mt-6 w-full rounded-lg bg-black py-4 font-medium text-white hover:bg-gray-900"
            >
              Complete Order
            </button>
          </div>
        </div>
      </aside>

    </div>
  </div>
</div>
</div>
)
}

export default CheckOut


