import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css"; // Ensure you create a separate CSS file for Admin branding

// ✅ Pointing to the Admin API Route
const API_BASE_URL = "http://localhost:4000/api/admin";

export default function AdminAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminSecretCode: "", // Extra security layer usually used for Admin registration
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= CHECK ADMIN AUTH =================
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      axios
        .get(`${API_BASE_URL}/is-auth`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          if (res.data.success) {
            navigate("/admin/dashboard");
          }
        })
        .catch(() => {
            localStorage.removeItem("adminToken");
        });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ================= ADMIN REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match");

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        secretCode: formData.adminSecretCode // Required to prevent random sign-ups
      });

      if (res.data.success) {
        setMessage("Admin account created. Log in now.");
        setMode("login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= ADMIN LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) { 
        // 🔑 Use unique keys for Admin to avoid conflict with Owner
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminData", JSON.stringify(res.data.admin));

        setMessage("Admin Access Granted");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 800);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <motion.div 
        className="auth-container admin-theme"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="auth-left admin-bg">
          <h2>HostelHub Admin</h2>
          <p>System-wide Control & Analytics</p>
        </div>

        <div className="auth-right">
          <h3>{mode === "login" ? "Admin Login" : "New Admin Setup"}</h3>
          
          <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
            {mode === "register" && (
              <input name="name" placeholder="Admin Full Name" onChange={handleChange} required />
            )}
            
            <input type="email" name="email" placeholder="Admin Email" onChange={handleChange} required />

            {mode === "register" && (
              <input type="text" name="adminSecretCode" placeholder="Master Secret Code" onChange={handleChange} required />
            )}

            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

            {mode === "register" && (
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            )}

            <button type="submit" className="admin-btn" disabled={loading}>
              {loading ? "Verifying..." : mode === "login" ? "Enter Dashboard" : "Create Admin"}
            </button>
          </form>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}

          <p className="switch">
            <span onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Register New Admin" : "Back to Login"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
