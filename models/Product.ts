import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true, // for SEO-friendly URLs
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number, // optional sale price
    },

    category: {
      type: String,
      index: true,
    },

    brand: {
      type: String,
    },

    stock: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      unique: true, // product identifier
    },

    images: {
      type: [String], // multiple images instead of one
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    tags: {
      type: [String], // for filtering/search
      default: [],
    },

    dimensions: {
      weight: Number,
      height: Number,
      width: Number,
      length: Number,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // if admin/seller creates product
    },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
