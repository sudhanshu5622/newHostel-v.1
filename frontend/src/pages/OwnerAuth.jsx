import { useState } from "react";
import { motion } from "framer-motion";
import "./OwnerAuth.css";

export default function OwnerAuth() {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* LEFT SECTION */}
        <div className="auth-left">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            alt="Hostel"
          />
          <h2>Hostel Owner Portal</h2>
          <p>
            Manage rooms, bookings, payments and connect with students from one
            powerful dashboard.
          </p>
        </div>

        {/* RIGHT SECTION (FORM) */}
        <div className="auth-right">
          <h3>{mode === "login" ? "Welcome Back 👋" : "Create Account 🚀"}</h3>
          <p className="subtitle">
            {mode === "login"
              ? "Login to manage your hostel"
              : "Register to start managing hostels"}
          </p>

          <form className="auth-form">
            {mode === "register" && (
              <input type="text" placeholder="Full Name" />
            )}

            <input type="email" placeholder="Email Address" />
            <input type="tel" placeholder="Phone Number" />
            <input type="password" placeholder="Password" />

            {mode === "register" && (
              <input type="password" placeholder="Confirm Password" />
            )}

            <button className="primary-btn">
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>

          {mode === "login" && (
            <span className="forgot">Forgot password?</span>
          )}

          <div className="divider">OR</div>

          <div className="social-buttons">
            <button className="google-btn">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" />
              Continue with Google
            </button>

            <button className="facebook-btn">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" />
              Continue with Facebook
            </button>
          </div>

          <p className="toggle-text">
            {mode === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}
            <span onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? " Sign Up" : " Login"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
