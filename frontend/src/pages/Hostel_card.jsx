import React, { useState } from "react";
import "./Hostel_card.css";

const cardData = [
  {
    id: 1,
    title: "Goa Beach Hostel",
    location: "Goa, India",
    price: "₹3,200 / month",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Relax near beaches and enjoy vibrant nightlife.",
  },
  {
    id: 2,
    title: "Manali Hills Hostel",
    location: "Himachal Pradesh, India",
    price: "₹4,000 / month",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
    description: "Perfect for nature lovers and adventure seekers.",
  },
];

const Hostal_card = () => {
  /* ===== STATES ===== */
  const [propertyType, setPropertyType] = useState("Hostel");
  const [gender, setGender] = useState("Male");
  const [price, setPrice] = useState(8000);
  const [bedType, setBedType] = useState("Single");
  const [location, setLocation] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  /* ===== HANDLERS ===== */
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSearch = () => {
    console.log({
      propertyType,
      gender,
      price,
      bedType,
      location,
    });
  };

  return (
    <div className="page-layout">
      {/* LEFT SIDE */}
      <div className="hostal-hero">
        <h1>
          Find Your <span>Perfect Stay</span>
        </h1>
        <p>Search Hostels, PGs or Rooms Across India with Ease</p>

        <div className="hostal-box">
          
          <div className="filter-block">
            <label>🏠 Property Type</label>
            <div
              className={`custom-dropdown ${openDropdown === "property" ? "open" : ""}`}
              onClick={() => toggleDropdown("property")}
            >
              <div className="dropdown-selected">
                {propertyType} <span className="arrow">▾</span>
              </div>

              {openDropdown === "property" && (
                <ul className="dropdown-menu">
                  {["Hostel", "PG", "Room"].map((item) => (
                    <li
                      key={item}
                      className={propertyType === item ? "active" : ""}
                      onClick={() => {
                        setPropertyType(item);
                        setOpenDropdown(null);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* GENDER */}
          <div className="filter-block">
            <label>👤 Preferred Gender</label>
            <div
              className={`custom-dropdown ${openDropdown === "gender" ? "open" : ""}`}
              onClick={() => toggleDropdown("gender")}
            >
              <div className="dropdown-selected">
                {gender} <span className="arrow">▾</span>
              </div>

              {openDropdown === "gender" && (
                <ul className="dropdown-menu">
                  {["Male", "Female", "Any"].map((item) => (
                    <li
                      key={item}
                      className={gender === item ? "active" : ""}
                      onClick={() => {
                        setGender(item);
                        setOpenDropdown(null);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* PRICE */}
          <div className="filter-block">
            <label>💰 Price Range</label>
            <input
              type="range"
              min="2000"
              max="8000"
              step="500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="price-value">Up to ₹{price}</p>
          </div>

          {/* BED TYPE */}
          <div className="filter-block">
            <label>🛏 Bed Type</label>
            <div
              className={`custom-dropdown ${openDropdown === "bed" ? "open" : ""}`}
              onClick={() => toggleDropdown("bed")}
            >
              <div className="dropdown-selected">
                {bedType} Bed <span className="arrow">▾</span>
              </div>

              {openDropdown === "bed" && (
                <ul className="dropdown-menu">
                  {["Single", "Double", "Triple"].map((item) => (
                    <li
                      key={item}
                      className={bedType === item ? "active" : ""}
                      onClick={() => {
                        setBedType(item);
                        setOpenDropdown(null);
                      }}
                    >
                      {item} Bed
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* LOCATION */}
          <div className="input-block">
            <label>📍 Location</label>
            <input
              type="text"
              placeholder="Enter city or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button className="search-btn" onClick={handleSearch}>
            🔍 Search Stay
          </button>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="popular-section">
        <h2 className="main-heading">Most Popular Hostels</h2>

        <div className="card-list">
          {cardData.map((card) => (
            <div className="card" key={card.id}>
              <img src={card.image} alt={card.title} />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p className="location">{card.location}</p>
                <p className="price">{card.price}</p>
                <div className="rating">⭐⭐⭐⭐⭐ <span>{card.rating}</span></div>
                <p className="description">{card.description}</p>
                <div className="card-buttons">
                  <button className="book-btn">Book Now</button>
                  <button className="visit-btn">Visit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hostal_card;
