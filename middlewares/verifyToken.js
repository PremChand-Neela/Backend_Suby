import { Vendor } from "../models/Vendor.models.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const secretKey = process.env.ACCESS_TOKEN_SECRET

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }

    try {

        const decoded = jwt.verify(token, secretKey)
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor) {
            return res.status(404).json({ error: "vendor did not found" })
        }

        req.vendorId = vendor._id

        next()
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid token" });
    }
};

export default verifyToken;


