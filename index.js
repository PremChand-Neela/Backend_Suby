import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import vendorRoutes from "./routes/vendorRoutes.js";
import bodyParser from "body-parser";
import firmRoutes from "./routes/firmRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors());
app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));


app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server started listening on port number ${PORT}`);
});

