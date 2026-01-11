const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Owner = require("./models/Owner");
const Hostel = require("./models/Hostel");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Ensure uploads directory exists to prevent Multer errors
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

/* ------------------ MongoDB ------------------ */
mongoose
    .connect("mongodb://127.0.0.1:27017/hostelDB")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

/* ------------------ Multer ------------------ */
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

/* ------------------ API ------------------ */
app.post("/api/hostels", upload.array("images", 10), async (req, res) => {
    try {
        const {
            ownerName,
            ownerEmail,
            ownerPhone,
            name,
            location,
            rooms,
            rent,
            facilities,
        } = req.body;

        // 1. Save or Update Owner
        let owner = await Owner.findOne({ email: ownerEmail });
        if (!owner) {
            owner = new Owner({
                name: ownerName,
                email: ownerEmail,
                phone: ownerPhone,
            });
            await owner.save();
        }

        // 2. Parse Facilities safely
        const parsedFacilities = facilities ? JSON.parse(facilities) : {};

        // 3. Save Hostel
        const hostel = new Hostel({
            name,
            location,
            rooms: Number(rooms),
            rent: Number(rent),
            facilities: parsedFacilities,
            images: req.files.map((f) => f.path.replace(/\\/g, "/")), // Normalize path for web
            owner: owner._id,
        });

        await hostel.save();

        res.status(201).json({
            message: "Hostel published successfully!",
            hostel,
        });
    } catch (err) {
        console.error("🔥 Server Error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));