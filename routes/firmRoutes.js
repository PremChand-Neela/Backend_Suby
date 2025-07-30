import express from 'express';
import { addFirm, upload,deleteFirmById } from '../controllers/firmController.js';
import verifyToken  from '../middlewares/verifyToken.js';

const router = express.Router();

// Single image upload under the field name 'image'
router.route('/add-firm').post(verifyToken, upload.single('image'), addFirm);
router.route("/upload/imageName",(req,res) =>{
    const imageName = req.params.imageName;
    res.headerSent('Content-Type',"image/jpeg")
    res.sendFile(path.join(__dirname,'..',imageName))
    
})
router.route("/:firm-id").delete(deleteFirmById)


export default router;
