import React, { useState } from "react";

export default function ProfileForm() {
  const [form, setForm] = useState({
    fullName: "",
    adminName: "",
    phoneNumber: "",
    city: "",
    state: "",
    image: "",
  });

  const [msg, setMsg] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    setMsg("Profile Updated Successfully!");
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center p-6">

      <div className="w-full max-w-3xl space-y-6">

        {/* HEADER CARD */}
       

        {/* FORM CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          
           <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center mb-5">

          <div className="w-20 h-20 mx-auto rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold">
            {form.adminName ? form.adminName.charAt(0).toUpperCase() : "A"}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Admin Profile
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Complete your profile details
          </p>
        </div>

          <form onSubmit={submit} className="space-y-4">

            {/* Full Name */}
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={onChange}
              className="w-full text-black  p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
            />

            {/* Admin Name */}
            <label htmlFor="adminName" className="block text-sm font-medium text-gray-700">Admin Name</label>
            <input
              name="adminName"
              placeholder="Admin Name"
              value={form.adminName}
              onChange={onChange}
              className="w-full text-black p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
            />

            {/* Phone */}
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={onChange}
              className="w-full text-blackf p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
            />

            {/* City */}
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={onChange}
              className="w-full p-3 border tex-black border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
            />

            {/* State */}
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
            />

            {/* Image */}
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image URL</label>
            <input
              name="image"
              placeholder="Profile Image URL"
              value={form.image}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition font-medium"
            >
              Save Profile
            </button>

            {/* Message */}
            {msg && (
              <p className="text-center text-green-600 text-sm">
                {msg}
              </p>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}