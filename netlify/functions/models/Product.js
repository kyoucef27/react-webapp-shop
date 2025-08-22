
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price for this product."],
    },
    desc: {
      type: String,
      required: [true, "Please provide a short description for this product."],
    },
    fullDesc: {
      type: String,
      required: [true, "Please provide a full description for this product."],
    },
    gender: {
      type: String,
      enum: ["Man", "Woman", "Kid", "Parfume"],
      required: [true, "Please specify the gender category for this product."],
    },
    views: {
      type: Number,
      default: 0,
    },
    stars: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    pictures: {
      type: [String],
      required: [true, "Please provide at least one image for this product."],
    },
  },
  { timestamps: true }
);

// Reuse existing model if already compiled (important in serverless)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
