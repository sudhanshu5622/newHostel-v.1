import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function OwnerLogin() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Owner Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="identifier" placeholder="Email or Phone" value={form.identifier} onChange={onChange} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>New? <a href="/signup">Signup</a></p>
    </div>
  );
}
