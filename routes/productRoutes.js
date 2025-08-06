import express from 'express';
import { addProduct, upload} from '../controllers/productController.js';
import {getProductByFirm,deleteProductById} from "../controllers/productController.js";
import path from "path";


const router = express.Router();

// Single image upload under the field name 'image'
router.route('/add-product/:firmId').post(upload.single('image'), addProduct);
router.route("/:firmId/products").get(getProductByFirm);
router.route("/upload/:imageName",(req,res) =>{
    const imageName = req.params.imageName;
    res.header('Content-Type',"image/jpeg")
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
    
})
router.route("/:productId").delete(deleteProductById);
export default router;
