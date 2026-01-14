// // const express = require("express");
// // const cors = require("cors");
// // const mongoose = require("mongoose");
// // const multer = require("multer");
// // const path = require("path");
// // const fs = require("fs");

// // const Owner = require("./models/Owner");
// // const Hostel = require("./models/Hostel");

// // const app = express();
// // app.use(cors());
// // app.use(express.json());
// // app.use("/uploads", express.static("uploads"));

// // // Ensure uploads directory exists to prevent Multer errors
// // const uploadDir = "uploads/";
// // if (!fs.existsSync(uploadDir)) {
// //     fs.mkdirSync(uploadDir);
// // }

// // /* ------------------ MongoDB ------------------ */
// // mongoose
// //     .connect("mongodb://127.0.0.1:27017/hostelDB")
// //     .then(() => console.log("✅ MongoDB Connected"))
// //     .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // /* ------------------ Multer ------------------ */
// // const storage = multer.diskStorage({
// //     destination: uploadDir,
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + "-" + file.originalname);
// //     },
// // });

// // const upload = multer({ storage });

// // /* ------------------ API ------------------ */
// // app.post("/api/hostels", upload.array("images", 10), async (req, res) => {
// //     try {
// //         const {
// //             ownerName,
// //             ownerEmail,
// //             ownerPhone,
// //             name,
// //             location,
// //             rooms,
// //             rent,
// //             facilities,
// //         } = req.body;

// //         // 1. Save or Update Owner
// //         let owner = await Owner.findOne({ email: ownerEmail });
// //         if (!owner) {
// //             owner = new Owner({
// //                 name: ownerName,
// //                 email: ownerEmail,
// //                 phone: ownerPhone,
// //             });
// //             await owner.save();
// //         }

// //         // 2. Parse Facilities safely
// //         const parsedFacilities = facilities ? JSON.parse(facilities) : {};

// //         // 3. Save Hostel
// //         const hostel = new Hostel({
// //             name,
// //             location,
// //             rooms: Number(rooms),
// //             rent: Number(rent),
// //             facilities: parsedFacilities,
// //             images: req.files.map((f) => f.path.replace(/\\/g, "/")), // Normalize path for web
// //             owner: owner._id,
// //         });

// //         await hostel.save();

// //         res.status(201).json({
// //             message: "Hostel published successfully!",
// //             hostel,
// //         });
// //     } catch (err) {
// //         console.error("🔥 Server Error:", err);
// //         res.status(500).json({ error: err.message });
// //     }
// // });

// // app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const Owner = require("./Models/Owner");
// const Hostel = require("./models/Hostel");

// const app = express();

// /* ------------------ MIDDLEWARE ------------------ */
// app.use(cors());
// app.use(express.json());

// /* ------------------ UPLOADS SETUP ------------------ */
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// app.use("/uploads", express.static(uploadDir));

// /* ------------------ DATABASE ------------------ */
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch((err) => console.error("❌ MongoDB Error:", err));

// /* ------------------ MULTER CONFIG ------------------ */
// const storage = multer.diskStorage({
//     destination: uploadDir,
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//     fileFilter: (req, file, cb) => {
//         const allowed = ["image/jpeg", "image/png", "image/jpg"];
//         if (!allowed.includes(file.mimetype)) {
//             return cb(new Error("Only JPG, JPEG, PNG allowed"));
//         }
//         cb(null, true);
//     },
// });

// /* ------------------ POST: CREATE HOSTEL ------------------ */
// app.post("/api/hostels", upload.array("images", 10), async (req, res) => {
//     try {
//         const {
//             ownerName,
//             ownerEmail,
//             ownerPhone,
//             name,
//             location,
//             rooms,
//             rent,
//             facilities,
//         } = req.body;

//         /* ---- Validation ---- */
//         if (!ownerName || !ownerEmail || !name || !location) {
//             return res.status(400).json({ error: "Required fields missing" });
//         }

//         if (Number(rooms) <= 0 || Number(rent) <= 0) {
//             return res.status(400).json({ error: "Invalid rooms or rent" });
//         }

//         /* ---- Owner ---- */
//         let owner = await Owner.findOne({ email: ownerEmail });
//         if (!owner) {
//             owner = await Owner.create({
//                 name: ownerName,
//                 email: ownerEmail,
//                 phone: ownerPhone,
//             });
//         }

//         /* ---- Facilities Safe Parse ---- */
//         let parsedFacilities = {};
//         try {
//             parsedFacilities = facilities ? JSON.parse(facilities) : {};
//         } catch {
//             return res.status(400).json({ error: "Invalid facilities format" });
//         }

//         /* ---- Hostel ---- */
//         const hostel = await Hostel.create({
//             name,
//             location,
//             rooms: Number(rooms),
//             rent: Number(rent),
//             facilities: parsedFacilities,
//             images: req.files.map((f) =>
//                 f.path.replace(/\\/g, "/")
//             ),
//             owner: owner._id,
//         });

//         res.status(201).json({
//             message: "Hostel published successfully",
//             hostel,
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// /* ------------------ GET: ALL HOSTELS ------------------ */
// app.get("/api/hostels", async (req, res) => {
//     try {
//         const hostels = await Hostel.find().populate("owner");
//         res.json(hostels);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// /* ------------------ GET: SINGLE HOSTEL ------------------ */
// app.get("/api/hostels/:id", async (req, res) => {
//     try {
//         const hostel = await Hostel.findById(req.params.id).populate("owner");
//         if (!hostel) return res.status(404).json({ error: "Hostel not found" });
//         res.json(hostel);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// /* ------------------ DELETE HOSTEL ------------------ */
// app.delete("/api/hostels/:id", async (req, res) => {
//     try {
//         const hostel = await Hostel.findById(req.params.id);
//         if (!hostel) return res.status(404).json({ error: "Hostel not found" });

//         hostel.images.forEach((img) => {
//             const filePath = path.join(__dirname, img);
//             if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//         });

//         await hostel.deleteOne();
//         res.json({ message: "Hostel deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// /* ------------------ SERVER ------------------ */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//     console.log(`🚀 Server running on http://localhost:${PORT}`)
// );
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

/* ----------- IMPORT ROUTES & MODELS ----------- */
const connectDB = require("./config/db");
const ownerRoutes = require("./routes/ownerRoutes");

const Owner = require("./Models/Owner");
const Hostel = require("./models/Hostel");

const app = express();

/* ------------------ MIDDLEWARE ------------------ */
app.use(cors());
app.use(express.json());

/* ------------------ DATABASE ------------------ */
connectDB(process.env.MONGO_URI);

/* ------------------ UPLOADS SETUP ------------------ */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(uploadDir));

/* ------------------ MULTER CONFIG ------------------ */
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, JPEG, PNG allowed"));
    }
    cb(null, true);
  },
});

/* ================= OWNER AUTH ROUTES ================= */
app.use("/api/owner", ownerRoutes);

/* ================= HOSTEL ROUTES ================= */

/* -------- CREATE HOSTEL -------- */
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

    if (!ownerName || !ownerEmail || !name || !location) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    if (Number(rooms) <= 0 || Number(rent) <= 0) {
      return res.status(400).json({ error: "Invalid rooms or rent" });
    }

    /* ---- Find or Create Owner ---- */
    let owner = await Owner.findOne({ email: ownerEmail });
    if (!owner) {
      owner = await Owner.create({
        name: ownerName,
        email: ownerEmail,
        phone: ownerPhone,
      });
    }

    /* ---- Facilities Parse ---- */
    let parsedFacilities = {};
    try {
      parsedFacilities = facilities ? JSON.parse(facilities) : {};
    } catch {
      return res.status(400).json({ error: "Invalid facilities format" });
    }

    /* ---- Create Hostel ---- */
    const hostel = await Hostel.create({
      name,
      location,
      rooms: Number(rooms),
      rent: Number(rent),
      facilities: parsedFacilities,
      images: req.files.map((f) => f.path.replace(/\\/g, "/")),
      owner: owner._id,
    });

    res.status(201).json({
      message: "Hostel published successfully",
      hostel,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------- GET ALL HOSTELS -------- */
app.get("/api/hostels", async (req, res) => {
  try {
    const hostels = await Hostel.find().populate("owner");
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------- GET SINGLE HOSTEL -------- */
app.get("/api/hostels/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id).populate("owner");
    if (!hostel) return res.status(404).json({ error: "Hostel not found" });
    res.json(hostel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------- DELETE HOSTEL -------- */
app.delete("/api/hostels/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ error: "Hostel not found" });

    hostel.images.forEach((img) => {
      const filePath = path.join(__dirname, img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await hostel.deleteOne();
    res.json({ message: "Hostel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ ROOT ------------------ */
app.get("/", (req, res) => {
  res.send("Owner Auth + Hostel API is running 🚀");
});

/* ------------------ GLOBAL ERROR HANDLER ------------------ */
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});

/* ------------------ SERVER ------------------ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
