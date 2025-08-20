"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.Product = mongoose_1.models.Product || mongoose_1.default.model("Product", productSchema);
