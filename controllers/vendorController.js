import { Vendor } from '../models/Vendor.models.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });


const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json("email already taken")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword
    })
    await newVendor.save();

    res.status(201).json({ message: "Vendor registerd successfully" });
    console.log("registerd")
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" })

  }

}



const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find vendor by email
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })

    // Success
    console.log("Vendor logged in:", email);
    return res.status(200).json({ message: "Logged in successfully",token });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }

  
};

/*const getAllVendors = async(req,res) =>{
  try {
      const vendors = await Vendor.find().populate('firm');
      res.json({vendors});
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
      
    }  
}
*/
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firm', 'firmName firmLocation');

    if (!vendors || vendors.length === 0) {
      return res.status(404).json({ message: "No vendors found" });
    }

    res.json({ vendors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getVendorById = async(req,res) =>{
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId).populate('firm');
    if(!vendor){
      res.status(400).json({error:"Vendor not found"})
    }
    res.status(200).json({vendor})
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:"Internal sever error"})
    
  }
}


export {
  vendorRegister,
  vendorLogin,
  getAllVendors,
  getVendorById 
}


