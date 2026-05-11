"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      alert("Product Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Title */}
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            onChange={handleChange}
            className="w-full text-black border p-3 rounded-lg focus:ring-2 focus:ring-black"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            onChange={handleChange}
            rows={4}
            className="w-full text-black border p-3 rounded-lg focus:ring-2 focus:ring-black"
          />

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="w-full text-black  border p-3 rounded-lg focus:ring-2 focus:ring-black"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              onChange={handleChange}
              className="w-full text-black  border p-3 rounded-lg focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="w-full border text-black  p-3 rounded-lg focus:ring-2 focus:ring-black"
          />

          {/* 🆕 Category Image Upload */}
          <div className="w-full border p-4 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Picture
            </label>

            <input
              type="file"
              name="categoryImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-black"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
