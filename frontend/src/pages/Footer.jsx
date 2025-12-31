
// Footer.jsx
import React from "react";
import "./Footer.css";
import { Instagram, Facebook, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h2>About HostelHub</h2>
          <p>
            HostelHub is India's trusted student hostel discovery platform,
            helping engineering, nursing, B.Tech, diploma, NEET & JEE students 
            find safe and affordable accommodation near their colleges.
          </p>
          <p>
            We focus on verified properties, transparent pricing, hygiene, and 
            complete convenience for students living away from home.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="footer-section">
          <h2>Why Choose HostelHub?</h2>
          <ul className="list">
            <li>Verified Hostels Only</li>
            <li>Affordable & Transparent Pricing</li>
            <li>Student-Friendly Environment</li>
            <li>Trusted by Hundreds of Parents</li>
            <li>Fast & Easy Online Booking</li>
            <li>Clean Rooms & Safe Localities</li>
          </ul>
        </div>

        {/* Facilities */}
        <div className="footer-section">
          <h2>Top Facilities</h2>
          <ul className="list">
            <li>High-Speed Wi-Fi</li>
            <li>Nutritious Breakfast & Dinner</li>
            <li>24/7 Security & CCTV</li>
            <li>Power Backup & RO Water</li>
            <li>Study Table & Almirah</li>
            <li>Laundry & Cleaning Services</li>
          </ul>
        </div>

        {/* Cities */}
        <div className="footer-section">
          <h2>Top Cities We Serve</h2>
          <ul className="list">
            <li>Patna</li>
            <li>Ranchi</li>
            <li>Bhopal</li>
            <li>Indore</li>
            <li>Delhi NCR</li>
            <li>Kolkata</li>
          </ul>
        </div>

        {/* Founder */}
        <div className="footer-section">
          <h2>Founder</h2>
          <p className="founder-name"><h2 className="gr">Sudhanshu Kumar</h2></p>
          <p>
            A tech-enthusiast and student community supporter, on a mission to 
            make hostel searching simpler, safer, and smarter for every student.
          </p>
        </div>

        {/* Contact & Social */}
        <div className="footer-section">
          <h2>Student Help Desk</h2>
          <p><strong>Phone:</strong> +91 6203 478 470</p>
          <p><strong>Email:</strong> hostelhub.support@gmail.com</p>
          <p><strong>Address:</strong> Bhopal, Madhya Pradesh</p>

          <div className="social-icons">
            <Instagram className="social" size={26} />
            <Facebook className="social" size={26} />
            <Linkedin className="social" size={26} />
            <Github className="social" size={26} />
          </div>
        </div>

      </div>

      <p className="footer-bottom">
        © {new Date().getFullYear()} HostelHub. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
