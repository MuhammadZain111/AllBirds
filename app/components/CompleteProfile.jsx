"use client";

import React, { useState } from "react";
import { Camera, ShieldCheck, LogOut, Trash2, Mail, Lock } from "lucide-react";

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";



function CompleteProfile() {

   
     const { data: session, status } = useSession();
   
  const [preview, setPreview] = useState(
    user?.image || "https://i.pravatar.cc/150",
  );

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [twoStep, setTwoStep] = useState(false);

  const [supportAccess, setSupportAccess] = useState(true);

  const [ showAddressInput ,setShowAddressInput] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "Brian",
    lastName: user?.lastName || "Frederin",
  });



  // Image Change
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload
  const handleUpload = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const data = new FormData();

      data.append("file", image);
      data.append("email", session?.user?.email);

      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-10">
          {/* Profile Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side */}

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black text-black   "
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black text-black    "
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5 min-w-[300px]">
              {/* Image */}

              {/* Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3 flex-wrap">
                  <label className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer hover:bg-gray-900 transition">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => setPreview("https://i.pravatar.cc/150")}
                    className="bg-gray-100 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition text-black    "
                  >
                    Remove
                  </button>
                </div>

                <p className="text-sm text-gray-500">PNGs, JPEGs under 2MB</p>

                {image && (
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="bg-violet-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-violet-700 transition"
                  >
                    {loading ? "Uploading..." : "Save Image"}
                  </button>
                )}
              </div>

              <div className="relative">
                <img
                  src={preview}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />

                <label className="absolute bottom-0 right-0 bg-black p-2 rounded-full cursor-pointer hover:scale-105 transition">
                  <Camera size={16} className="text-white" />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Account Security
              </h2>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} />
                    Email
                  </label>

                  <div className="rounded-lg  px-5 py-1">
                    <input
                      type="email"
                      value={session?.user?.email}
                      readOnly
                      className="text-black p-2  cursor-not-allowed focus:outline-hidden w-full max-w-xl rounded-xl border border-gray-300 px-4 py-3 bg-gray-100 "
                    />
                  </div>
                </div>
              </div>

              {/* Password */}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Lock size={16} />
                    Password
                  </label>

                  <input
                    type="password"
                    value="password123"
                    readOnly
                    className="w-full max-w-xl rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500"
                  />
                </div>

                <button className="bg-gray-100 px-5 py-3 rounded-xl hover:bg-gray-200 transition text-sm font-medium">
                  Change Password
                </button>
              </div>

              {/* 2FA */}
              <div className="flex items-center justify-between border rounded-2xl px-5 py-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    2-Step Verification
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Add extra protection to your account
                  </p>
                </div>

                <button
                  onClick={() => setTwoStep(!twoStep)}
                  className={`w-14 h-8 rounded-full transition relative ${
                    twoStep ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${
                      twoStep ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Add Addresss
            </h2>

            <div className="space-y-6">
              {/* Support Access */}

              <div className="border rounded-2xl px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Add your delivery or billing address
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddressInput(!showAddressInput)}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                  >
                    {showAddressInput ? "Close" : "Add Address"}
                  </button>
                </div>

                {/* Dropdown input */}
                {showAddressInput && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address..."
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                      onClick={() => {
                        console.log("Address saved:", address);

                        // TODO: add to form data here
                        setShowAddressInput(false);
                      }}
                      className="mt-3 bg-black text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Save Address
                    </button>
                  </div>
                )}
              </div>

              {/* Logout */}
              <div className="flex items-center justify-between border rounded-2xl px-5 py-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Log out all devices
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    End all active sessions
                  </p>
                </div>

                <button className="flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-xl hover:bg-gray-200 transition text-black cursor-pointer "
           onClick={() => signOut()}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>

              {/* Delete */}
              <div className="flex items-center justify-between border border-red-200 bg-red-50 rounded-2xl px-5 py-4">
                <div>
                  <h3 className="font-semibold text-red-600">Delete Account</h3>

                  <p className="text-sm text-red-500 mt-1">
                    Permanently remove your account
                  </p>
                </div>

                <button className="flex items-center gap-2 bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
