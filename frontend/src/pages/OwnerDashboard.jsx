import { useState } from "react";
import { motion } from "framer-motion";
import "./OwnerDashboard.css";

const FACILITIES = {
  basic: [
    "24x7 Water Supply",
    "Power Backup",
    "RO Drinking Water",
    "Daily Room Cleaning",
    "Washroom",
    "Fan / AC",
    "Study Table & Chair",
    "Bed + Mattress + Pillow",
    "Cupboard / Almirah",
  ],
  security: [
    "CCTV Surveillance",
    "24x7 Security Guard",
    "Biometric / RFID Entry",
    "Fire Safety",
    "Emergency Exit",
    "Visitor Register",
  ],
  tech: [
    "High-Speed WiFi",
    "LAN Port",
    "Smart TV",
    "App-based Complaint System",
  ],
  food: [
    "Daily Meals",
    "Mess Facility",
    "Common Kitchen",
    "Refrigerator",
    "Gas / Induction Stove",
    "Filtered Water",
  ],
  laundry: [
    "Washing Machine",
    "Laundry Service",
    "Iron / Iron Stand",
    "Geyser",
  ],
  premium: [
    "Gym",
    "AC Rooms",
    "Parking",
    "Luggage Storage",
    "Co-working Space",
  ],
  management: [
    "Online Rent Payment",
    "Monthly Invoice",
    "Entry–Exit Timing",
    "No Smoking / Alcohol",
    "Guest Policy",
  ],
  trust: [
    "Owner Verified",
    "Govt Registered",
    "Police Verified",
    "Ratings & Reviews",
    "Real Photos & Videos",
  ],
};

export default function HostelOwnerDashboard() {
  const [images, setImages] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rooms: "",
    rent: "",
  });
  const [facilities, setFacilities] = useState({});

  // text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map((f) => URL.createObjectURL(f)));
  };

  // checkbox toggle
  const toggleFacility = (item) => {
    setFacilities((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // save
  const handleSave = () => {
    setPreviewData({
      ...formData,
      images,
      facilities,
    });
  };

  return (
    <div className="dashboard-page">
      <motion.div className="dashboard-card" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
        <h2>🏨 Hostel Owner Dashboard</h2>
        <p className="subtitle">Fill details & preview before publishing</p>

        {/* BASIC INFO */}
        <section className="section">
          <h3>📌 Basic Information</h3>
          <div className="grid">
            <input name="name" placeholder="Hostel Name" onChange={handleChange}/>
            <input name="location" placeholder="Location / Area" onChange={handleChange}/>
            <input name="rooms" type="number" placeholder="Total Rooms" onChange={handleChange}/>
            <input name="rent" type="number" placeholder="Monthly Rent (₹)" onChange={handleChange}/>
          </div>
        </section>

        {/* MEDIA */}
        <section className="section">
          <h3>📸 Hostel Media</h3>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload}/>
          <div className="image-preview">
            {images.map((img,i)=>(<img key={i} src={img}/>))}
          </div>
        </section>

        {/* FACILITIES */}
        <section className="section">
          <h3>🛎 Hostel Facilities</h3>

          {Object.entries(FACILITIES).map(([group, items]) => (
            <div className="facility-box" key={group}>
              <h4>{group.toUpperCase()}</h4>
              <div className="checkbox-grid">
                {items.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={!!facilities[item]}
                      onChange={() => toggleFacility(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        <button className="save-btn" onClick={handleSave}>
          Save Hostel Details
        </button>
      </motion.div>

      {/* PREVIEW CARD */}
      {previewData && (
        <motion.div className="hostel-card" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}>
          <div className="slider">
            {previewData.images.map((img,i)=>(<img key={i} src={img}/>))}
          </div>

          <div className="hostel-info">
            <h3>{previewData.name}</h3>
            <p>📍 {previewData.location}</p>
            <p>🛏 Rooms: {previewData.rooms}</p>
            <p>💰 ₹{previewData.rent}/month</p>

            <div className="facility-preview">
              {Object.keys(FACILITIES).flatMap(k => FACILITIES[k]).map((f) => (
                <span key={f} className={previewData.facilities[f] ? "yes" : "no"}>
                  {f} {previewData.facilities[f] ? "✅" : "❌"}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
