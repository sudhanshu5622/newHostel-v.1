import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function OwnerSignup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/signup", form);
      setLoading(false);
      // go to OTP page with ownerId (required for verify/resend)
      navigate("/verify-otp", { state: { ownerId: res.data.ownerId } });
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="card">
      <h2>Owner Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={onChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} />
        <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Signup"}</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>Already have account? <a href="/login">Login</a></p>
    </div>
  );
}
