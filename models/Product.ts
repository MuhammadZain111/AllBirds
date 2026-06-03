import mongoose from "mongoose";

//Title,Category, Color fields set kerni hain

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
    },

    description: {
      type: String,
      trim: true,
    },
    size:{
      type:[String],
  
      },
    price: {
      type: Number,
      required: true,
    },
    colors: {
      type: [String],
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

    image: {
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
    strict: false, 
  },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
