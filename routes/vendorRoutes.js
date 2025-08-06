import { vendorRegister,vendorLogin, getAllVendors, getVendorById } from "../controllers/vendorController.js";
import { Router } from "express";


const router = Router();

router.route("/register").post(vendorRegister);
router.route("/login").post(vendorLogin);
router.route("/all-vendors").get(getAllVendors);
router.route("/single-vendor/:id").get(getVendorById)


export default router;