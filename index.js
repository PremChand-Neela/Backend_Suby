import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import vendorRoutes from "./routes/vendorRoutes.js";
import bodyParser from "body-parser";
import firmRoutes from "./routes/firmRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";



dotenv.config({ path: './.env' });


const app=express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("database connected successfully"))
  .catch((error) => console.log(error));

app.use(bodyParser.json())
app.use("/vendor",vendorRoutes)
app.use("/firm",firmRoutes)
app.use("/product",productRoutes)
app.use("/uploads",express.static("uploads"))


app.listen(PORT,()=>{
    console.log(`Server started listening on port number ${PORT}`)
})

app.use('/',(req,res)=>{
    res.send("<h1>Welcome to Suby</h1>")
})
