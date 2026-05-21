"use client";

import React, { useState, useEffect } from "react";
import {
  Camera,
  ShieldCheck,
  LogOut,
  Trash2,
  Mail,
  Lock,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function CompleteProfile() {
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  const [isEditname, setIsEditname] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [preview, setPreview] = useState("/icons/user.png");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [address, setAddress] = useState("");

  const [formData, setFormData] = useState({
    Name: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [nameSuccess, setNameSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/get-user");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setPreview(data.user?.image || "/icons/user.png");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (session?.user?.username) {
      setFormData({ Name: session.user.username });
    }
  }, [session]);

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

  // Upload Image
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
      await update();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Update Name
  const handleUpdateName = async () => {
    if (!formData.Name.trim()) return;
    try {
      setNameLoading(true);
      setNameSuccess("");
      const res = await fetch("/api/update-name", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          name: formData.Name,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNameSuccess("Name updated successfully");
        setIsEditname(false);
      } else {
        alert(data.message || "Failed to update name");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setNameLoading(false);
    }
  };

  // Update Password
  const handleUpdatePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All fields are required");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      setPasswordLoading(true);
      const res = await fetch("/api/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPasswordSuccess("Password updated successfully");
        setIsEditPassword(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setPasswordError(data.message || "Failed to update password");
      }
    } catch (error) {
      console.log(error);
      setPasswordError("Something went wrong");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
          <h1 className="text-black font-semibold">
            Welcome {session?.user?.username}
          </h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-10">
          {/* Profile Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name Field */}
                <div className="relative w-full">
                  <input
                    type="text"
                    value={formData.Name}
                    disabled={!isEditname}
                    onChange={(e) =>
                      setFormData({ ...formData, Name: e.target.value })
                    }
                    className={`w-full rounded-xl border px-4 py-3 outline-none text-black pr-16
                      ${isEditname ? "border-black focus:ring-2 focus:ring-black" : "bg-gray-100 border-gray-300"}`}
                  />

                  {/* Edit / Save / Cancel icons */}
                  {!isEditname ? (
                    <button
                      type="button"
                      onClick={() => setIsEditname(true)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-black transition"
                      title="Edit name"
                    >
                      <Pencil size={16} />
                    </button>
                  ) : (
                    <div className="absolute right-3 top-3 flex gap-2">
                      <button
                        type="button"
                        onClick={handleUpdateName}
                        disabled={nameLoading}
                        className="text-green-600 hover:text-green-700 transition"
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditname(false);
                          setFormData({ Name: session?.user?.username || "" });
                        }}
                        className="text-red-500 hover:text-red-600 transition"
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {nameSuccess && (
                  <p className="text-sm text-green-600 mt-1">{nameSuccess}</p>
                )}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex items-start gap-5 min-w-[300px]">
              {/* Image Buttons */}
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
                    onClick={() => {
                      setPreview("/icons/user.png");
                      setImage(null);
                    }}
                    className="bg-gray-100 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition text-black"
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
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
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
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-lg px-5 py-1">
                    <input
                      type="email"
                      value={session?.user?.email || ""}
                      readOnly
                      className="flex items-center gap-2 text-sm font-medium mb-2 text-black p-2 cursor-not-allowed focus:outline-hidden w-full max-w-xl rounded-xl border border-gray-300 px-4 py-3 bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col lg:flex-row lg:items-center  justify-between ">
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Lock size={16} />
                    Password
                  </label>

                  {!isEditPassword ? (
                    <div className="relative w-full max-w-xl">
                      <input
                        type="password"
                        value="password123"
                        readOnly
                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-5 py-3 text-gray-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditPassword(true)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-black transition"
                        title="Change password"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full max-w-xl space-y-3">
                      <input
                        type="password"
                        placeholder="Current password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:ring-2 focus:ring-black"
                      />

                      {passwordError && (
                        <p className="text-sm text-red-500">{passwordError}</p>
                      )}
                      {passwordSuccess && (
                        <p className="text-sm text-green-600">
                          {passwordSuccess}
                        </p>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={handleUpdatePassword}
                          disabled={passwordLoading}
                          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm hover:bg-gray-900 transition"
                        >
                          <Check size={14} />
                          {passwordLoading ? "Saving..." : "Save Password"}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditPassword(false);
                            setPasswordData({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            });
                            setPasswordError("");
                            setPasswordSuccess("");
                          }}
                          className="flex items-center gap-2 bg-gray-100 text-black px-5 py-2.5 rounded-xl text-sm hover:bg-gray-200 transition"
                        >
                          <X size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {!isEditPassword && (
                  <button
                    onClick={() => setIsEditPassword(true)}
                    className="bg-white px-5 py-3 rounded-xl  border border-black cursor-pointer hover:bg-black hover:text-white transition text-sm font-medium text-black mt-5 cursor-pointer "
                  >
                    Change Password
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Add Address
            </h2>

            <div className="space-y-6">
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

                {showAddressInput && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address..."
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black text-black"
                    />
                    <button
                      onClick={() => {
                        console.log("Address saved:", address);
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
                <button
                  className="flex items-center gap-2 bg-white border  border-black px-4 py-2 rounded-xl transition text-black  hover:text-white hover:bg-black  cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>

              {/* Delete */}
              <div className="flex items-center justify-between border border-red-200 bg-red-50 rounded-2xl px-5 py-3">
                <div>
                  <h3 className="font-semibold text-red-600">Delete Account</h3>
                  <p className="text-sm text-red-500 mt-1">
                    Permanently remove your account
                  </p>
                </div>
                <button className="flex items-center gap-2 bg-white text-black  border  border-black px-5 py-3 rounded-xl cursor-pointer  hover:bg-black hover:text-white transition">
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
