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

  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Frontend validation
  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.price || formData.price <= 0)
      return "Price must be greater than 0";
    if (!formData.category.trim()) return "Category is required";
    if (formData.stock < 0) return "Stock cannot be negative";
    if (!image) return "Image is required";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    setError("");
    setSuccess("");

    // Step 1:
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      //Step 2: Use FormData (because image is included)
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("file", image);

      const response = await fetch("/api/product", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", result);

      // Step 3: Handle backend error
      if (!response.ok || !result.success) {
        setError(result.message || "Something went wrong");
        return;
      }

      // Success
      setSuccess("Product added successfully!");

      // Reset form

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
      setImage(null);
    } catch (err) {
      console.log(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-100 text-green-600 p-3 rounded-md">
              {success}
            </div>
          )}

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Product Title"
            onChange={handleChange}
            className="w-full text-black border p-3 rounded-lg"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            placeholder="Product Description"
            onChange={handleChange}
            rows={4}
            className="w-full text-black border p-3 rounded-lg"
          />

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              value={formData.price}
              placeholder="Price"
              onChange={handleChange}
              className="w-full text-black border p-3 rounded-lg"
            />

            <input
              type="number"
              name="stock"
              value={formData.stock}
              placeholder="Stock"
              min="0"
              onChange={(e) => {
                const value = Math.max(0, e.target.value);
                setFormData({ ...formData, stock: value });
              }}
              className="w-full text-black border p-3 rounded-lg"
            />
          </div>

          {/* Category */}
          <input
            type="text"
            name="category"
            value={formData.category}
            placeholder="Category"
            onChange={handleChange}
            className="w-full border text-black p-3 rounded-lg"
          />

          {/* Image */}
          <div className="w-full border p-4 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-black"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition cussor-pointer "
          >
            {loading ? "Adding Product. ..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
