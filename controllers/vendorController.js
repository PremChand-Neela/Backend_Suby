import { Vendor } from '../models/Vendor.models.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });


const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log(email);

    // Check if email is already registered
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new vendor
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });
    await newVendor.save();

    console.log("Vendor registered:", newVendor._id);
    res.status(201).json({ message: "Vendor registered successfully" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



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
    const vendorId = vendor._id
    console.log("Vendor logged in:", email);
    return res.status(200).json({ message: "Logged in successfully",token ,vendorId});

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

    return res.status(200).json({ vendors });
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
      return res.status(404).json({error:"Vendor not found"})
    }
    const vendorFirmId = vendor.firm[0]._id
    res.status(200).json({vendor,vendorFirmId,vendorId})
    console.log(vendorFirmId);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:"Internal server error"})
    
  }
}


export {
  vendorRegister,
  vendorLogin,
  getAllVendors,
  getVendorById 
}


