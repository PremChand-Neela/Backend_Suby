import { Vendor } from "../models/Vendor.models.js";
import { Firm } from "../models/Firm.models.js";
import multer from 'multer';
import fs from 'fs';

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Where to store uploaded files
  },
  filename: function (req, file, cb) {
    // Rename file: e.g., 1719462145000-myimage.jpg
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      res.status(404).json({ message: "Vendor is not found" })
    }

    const firm = new Firm({
      firmName, area, category, region, offer, image, vendor: vendor._id
    })

    const savedFirm= await firm.save();
    vendor.firm.push(savedFirm);
    await vendor.save();

    return res.status(200).json({ message: "Firm added successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })

  }

}

const deleteFirmById = async(req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export { addFirm, upload ,deleteFirmById};