import React, { useState } from "react";
import { MapPin, Search, CircleUserRound, UserCircle2, LogOut, ChevronDown, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import BrandLogo from "../assets/image/12345.png";
import "./Nav.css";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Navbar() {
  const { isAuthenticated, isLoading, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) {
    return <div className="navbar">Loading...</div>;
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={BrandLogo} alt="Brand Logo" />
      </Link>

      <div className="navbar-search">
        <MapPin className="text-gray-500" size={20} />
        <input type="text" placeholder="Search your location" />
        <button>
          <Search size={18} />
        </button>
      </div>

      <div className="navbar-menu">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <button>My Hostel</button>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <UserCircle2 />
                <ChevronDown className={isDropdownOpen ? "rotate-180" : ""} />
              </button>
              {isDropdownOpen && (
                <div className="navbar-dropdown">
                  <Link to="/userprofile" onClick={() => setIsDropdownOpen(false)}>
                    <User size={16} /> Profile
                  </Link>
                  <button onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button>
                Login / Sign Up <CircleUserRound size={16} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
