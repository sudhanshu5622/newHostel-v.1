import React, { useState } from "react";
import { MapPin, Search, CircleUserRound, UserCircle2, LogOut, ChevronDown, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import BrandLogo from "../assets/image/12345.png";

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
    return (
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-3 flex justify-between items-center">
        Loading...
      </div>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-3 flex flex-wrap justify-between items-center gap-3">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={BrandLogo} alt="Brand Logo" className="h-8" />
      </Link>

      {/* Search Input */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1 w-full max-w-md">
        <MapPin className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search your location"
          className="bg-transparent focus:outline-none flex-grow text-gray-700 placeholder-gray-400"
        />
        <button className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg transition">
          <Search size={18} />
        </button>
      </div>

      {/* Menu + Auth */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">
          Home
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition">
          About
        </Link>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition">
          My Hostel
        </button>

        {/* Auth Section */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 border px-3 py-2 rounded-full hover:bg-gray-100 transition"
            >
              <UserCircle2 className="text-indigo-600" />
              <ChevronDown
                className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg flex flex-col z-50">
                <Link
                  to="/userprofile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 text-gray-700 transition"
                >
                  <User size={16} /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700 transition">
              Login / Sign Up <CircleUserRound size={16} />
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
