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
    <div className="max-w-2xl mx-auto p-6">
    
      <h1 className="text-3xl font-bold mb-6 text-black   ">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          onChange={handleChange}
          className="w-full border p-3 rounded text-black "
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-3 rounded text-black " 
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border p-3 rounded text-black"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full border p-3 rounded text-black  "
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="w-full border p-3 rounded text-black   "
        />

        {/* <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full border p-3 rounded text-black  "
        /> */}

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}