"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function CheckOut() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } =
    useCart();

  const router = useRouter();

  //here is the fuction to check the Validatio and make the api Call.

  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    Name: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/get-user");
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (session?.user?.username) {
      setFormData({ Name: session.user.username });
    }
  }, [session]);

  const handleCheckout = async () => {
    try {
      // 1. Check login
      const user = localStorage.getItem("user");

      if (!user) {
        router.push("/sign-in");
        return;
      }

      // 2. Validate form
      const isValid = checkValidation();

      if (!isValid) return;

      // 3. Proceed to order
      await handlePlaceOrder();
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong during checkout. Please try again.");
    }
  };

  const checkValidation = async () => {
    const isAddressValid = address?.name && address?.city && address?.phone;

    const isCartValid = products?.length > 0;
    const isAmountValid = totalAmount > 0;

    if (!isAddressValid || !isCartValid || !isAmountValid) {
      alert("Please fill all required fields correctly");
      return;
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
          address,
          totalAmount,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const order = await orderResponse.json();

      // Now call payment API

      const paymentResponse = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order._id,
          amount: order.totalAmount,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Payment API failed");
      }

      const payment = await paymentResponse.json();

      if (!payment?.paymentUrl) {
        throw new Error("Invalid payment URL");
      }
      window.location.href = payment.paymentUrl;
    } catch (error) {
      console.error("Order Error:", error);
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div>
      <div class="min-h-screen bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
            <form>
              <div class="space-y-8">
                <section class="rounded-xl bg-white p-6 shadow-sm">
                  <h2 class="mb-4 text-2xl font-semibold text-black">
                    Contact
                  </h2>

                  <input
                    type="email"
                    placeholder="Email"
                    class="w-full rounded-lg border border-gray-300 text-black px-4 py-3 focus:border-black focus:outline-none"
                  />
                </section>

                {/* <!-- Delivery --> */}
                <section class="rounded-xl bg-white p-6 shadow-sm">
                  <h2 class="mb-4 text-2xl font-semibold text-black ">
                    Delivery
                  </h2>

                  <div class="space-y-4">
                    <input
                      placeholder="Country / Region"
                      class="w-full rounded-lg border px-4 py-3 text-black"
                    />

                    <div class="grid grid-cols-2 gap-4">
                      <input
                        placeholder="First Name"
                        class="rounded-lg border px-4 py-3 text-black"
                      />

                      <input
                        placeholder="Last Name"
                        class="rounded-lg border px-4 py-3 text-black  "
                      />
                    </div>

                    <input
                      placeholder="Address"
                      class="w-full rounded-lg border px-4 py-3 text-black"
                    />

                    <div class="grid grid-cols-3 gap-4">
                      <input
                        placeholder="City"
                        class="rounded-lg border px-4 py-3 text-black  "
                      />

                      <select class="rounded-lg border px-4 py-3 text-black ">
                        <option>State</option>
                      </select>

                      <input
                        placeholder="ZIP"
                        class="rounded-lg border px-4 py-3 text-black "
                      />
                    </div>
                  </div>
                </section>
                {/* 
        <!-- Payment --> */}
                <section class="rounded-xl bg-white p-6 shadow-sm">
                  <h2 class="mb-4 text-2xl font-semibold text-black ">
                    Payment
                  </h2>

                  <div class="space-y-4">
                    <input
                      placeholder="Card Number"
                      class="w-full rounded-lg border px-4 py-3 text-black  "
                    />

                    <div class="grid grid-cols-2 gap-4 text-black    ">
                      <input
                        placeholder="MM / YY"
                        class="rounded-lg border px-4 py-3 text-black"
                      />

                      <input
                        placeholder="CVV"
                        class="rounded-lg border px-4 py-3 text-black"
                      />
                    </div>

                    <input
                      placeholder="Name on Card"
                      class="w-full rounded-lg border px-4 py-3 text-black"
                    />
                  </div>
                </section>
              </div>
              {/* 
      <!-- RIGHT: Order Summary --> */}
              <aside class="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
                <div class="flex h-full flex-col rounded-xl bg-white shadow-sm">
                  {/* <!-- Scrollable Product Area --> */}
                  <div class="flex-1 overflow-y-auto p-6">
                    <h2 class="mb-6 text-xl font-semibold text-black  ">
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
                          <p class="font-medium text-black">
                            Women's Tree Glider
                          </p>
                          <p class="text-sm text-black">Burlwood Sole</p>
                        </div>

                        <span class="font-semibold text-black ">$700</span>
                      </div>

                      {/* <!-- Duplicate products --> */}
                      <div class="flex gap-4">
                        <img
                          src="https://via.placeholder.com/80"
                          alt=""
                          class="h-20 w-20 rounded-lg object-cover"
                        />

                        <div class="flex-1">
                          <p class="font-medium text-black ">
                            Recycled Belt Bag
                          </p>
                          <p class="text-sm text-black">Black</p>
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
                        class="flex-1 rounded-lg border px-4 py-3 text-black "
                      />

                      <button class="rounded-lg bg-black px-5 text-white">
                        Apply
                      </button>
                    </div>

                    <div class="space-y-3">
                      <div class="flex justify-between text-black">
                        <span>Subtotal</span>
                        <span>$700.00</span>
                      </div>

                      <div class="flex justify-between text-black ">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>

                      <div class="border-t pt-3">
                        <div class="flex justify-between text-xl font-bold text-black">
                          <span>Total</span>
                          <span>$700.00</span>
                        </div>
                      </div>
                    </div>

                    <button
                      class="mt-6 w-full rounded-lg bg-black py-4 font-medium text-white hover:bg-gray-900 cursor-pointer "
                      onClick={handleCheckout}
                    >
                      Complete Order
                    </button>
                  </div>
                </div>
              </aside>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
