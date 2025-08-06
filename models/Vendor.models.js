import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Firm'
    }
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
}, { timestamps: true });

export const Vendor = mongoose.model("Vendor", vendorSchema);
