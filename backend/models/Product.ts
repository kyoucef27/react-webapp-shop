import mongoose, { Schema, models } from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  desc: string;
  fullDesc: string;
  gender: "Man" | "Woman" | "Kid" | "Parfume";
  views: number;
  stars: number;
  sold: number;
  pictures: string[];
}

const productSchema = new Schema<IProduct>(
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

export const Product =
  models.Product || mongoose.model<IProduct>("Product", productSchema);
