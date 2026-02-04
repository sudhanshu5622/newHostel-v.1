import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
//import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";

import connectDB from "./config/db.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import Owner from "./models/Owner.js";
import Hostel from "./models/Hostel.js";
//import { Hostel } from "./models/Hostel.js";
const app = express();
/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
/* ================= DATABASE ================= */
connectDB(process.env.MONGO_URI);
/* ================= ROUTES ================= */
app.use("/api/owner", ownerRoutes);

/* ================= __dirname FIX ================= */
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ================= UPLOADS ================= */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use("/uploads", express.static(uploadDir));

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= HOSTEL API ================= */
app.post("/api/hostels", upload.array("images", 10), async (req, res) => {
  try {
    const { ownerEmail, name, location, rooms, rent } = req.body;

    if (!ownerEmail || !name || !location) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const owner = await Owner.findOne({ email: ownerEmail });
    if (!owner) return res.status(404).json({ message: "Owner not found" });

    const hostel = await Hostel.create({
      name,
      location,
      rooms,
      rent,
      images: req.files.map(f => f.path),
      owner: owner._id
    });

    res.status(201).json({ message: "Hostel created", hostel });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("API Running...");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/db.js";
// import ownerRoutes from "./routes/ownerRoutes.js";
// import Owner from "./models/Owner.js";
// import Hostel from "./models/Hostel.js";

// dotenv.config();

// const app = express();

// /* ================= MIDDLEWARE ================= */
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// /* ================= DATABASE ================= */
// connectDB(process.env.MONGO_URI);

// /* ================= AUTH TEST ================= */
// app.get("/api/auth/is-auth", (req, res) => {
//   res.json({ success: true, message: "User authenticated" });
// });

// /* ================= ROUTES ================= */
// app.use("/api/owner", ownerRoutes);

// /* ================= UPLOAD DIR ================= */
// const __dirname = new URL(".", import.meta.url).pathname;
// const uploadDir = path.join(__dirname, "uploads");

// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
// app.use("/uploads", express.static(uploadDir));

// /* ================= MULTER ================= */
// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// /* ================= HOSTEL API ================= */
// app.post("/api/hostels", upload.array("images", 10), async (req, res) => {
//   try {
//     const { ownerEmail, name, location, rooms, rent } = req.body;

//     if (!ownerEmail || !name || !location) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     const owner = await Owner.findOne({ email: ownerEmail });
//     if (!owner) return res.status(404).json({ message: "Owner not found" });

//     const hostel = await Hostel.create({
//       name,
//       location,
//       rooms,
//       rent,
//       images: req.files.map(f => f.path),
//       owner: owner._id
//     });

//     res.status(201).json({ message: "Hostel created", hostel });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// /* ================= START SERVER ================= */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

