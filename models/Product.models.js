import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number, // Fixed: should be a number
    required: true
  },
  category: {
    type: [{
      type: String,
      enum: ["veg", "non-veg"]
    }]
  },
  image: {
    type: String
  },
  bestSeller: {
    type: Boolean, // Fixed: should be a boolean
    default: false
  },
  description: {
    type: String
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Firm"
  }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
