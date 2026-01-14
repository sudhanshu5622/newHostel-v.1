// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import API from "../api/api";
// import OTPInputs from "../components/OTPInputs";
// export default function OTPVerification() {
//   const loc = useLocation();
//   const navigate = useNavigate();
//   const ownerId = loc.state?.ownerId;
//   const [emailOtp, setEmailOtp] = useState("");
//   const [phoneOtp, setPhoneOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   if (!ownerId) {
//     return (<div className="card"><p>OwnerId missing. Go to signup first.</p></div>);
//   }

//   const handleVerify = async () => {
//     setErr(""); setLoading(true);
//     try {
//       await API.post("/verify-otp", { ownerId, emailOtp, phoneOtp });
//       setLoading(false);
//       alert("Verified! Please login.");
//       navigate("/login");
//     } catch (e) {
//       setLoading(false);
//       setErr(e.response?.data?.error || "Verification failed");
//     }
//   };

//   const handleResend = async () => {
//     setErr(""); setLoading(true);
//     try {
//       await API.post("/resend-otp", { ownerId });
//       setLoading(false);
//       alert("OTPs resent (mock). Check console.");
//     } catch (e) {
//       setLoading(false);
//       setErr(e.response?.data?.error || "Resend failed");
//     }
//   };

//   return (
//     <div className="card">
//       <h2>OTP Verification</h2>
//       <p>Enter Email OTP:</p>
//       <OTPInputs value={emailOtp} onChange={setEmailOtp} />
//       <p>Enter Phone OTP:</p>
//       <OTPInputs value={phoneOtp} onChange={setPhoneOtp} />
//       <div style={{ marginTop: 12 }}>
//         <button onClick={handleVerify} disabled={loading}>{loading ? "Verifying..." : "Verify"}</button>
//         <button onClick={handleResend} style={{ marginLeft: 8 }}>Resend OTP</button>
//       </div>
//       {err && <p className="error">{err}</p>}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "/Users/sudhanshukumar/Desktop/mazorProject/Sretch-Hotel/frontend/src/api/api.js";
import OTPInputs from "/Users/sudhanshukumar/Desktop/mazorProject/Sretch-Hotel/frontend/src/components/OPTInput.jsx";

export default function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();

  // fallback to localStorage (important)
  const storedOwnerId = localStorage.getItem("ownerId");
  const ownerId = location.state?.ownerId || storedOwnerId;

  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // save ownerId if coming from signup
  useEffect(() => {
    if (location.state?.ownerId) {
      localStorage.setItem("ownerId", location.state.ownerId);
    }
  }, [location.state]);

  if (!ownerId) {
    return (
      <div className="card">
        <p>Session expired. Please signup again.</p>
        <button onClick={() => navigate("/signup")}>Go to Signup</button>
      </div>
    );
  }

  const handleVerify = async () => {
    if (!emailOtp || !phoneOtp) {
      return setErr("Please enter both OTPs");
    }

    try {
      setErr("");
      setLoading(true);

      await API.post("/api/owner/verify-otp", {
        ownerId,
        emailOtp,
        phoneOtp,
      });

      localStorage.removeItem("ownerId");
      alert("OTP Verified! Please login.");
      navigate("/login");
    } catch (e) {
      setErr(e.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setErr("");
      setLoading(true);

      await API.post("/api/owner/resend-otp", { ownerId });
      alert("OTP resent successfully");
    } catch (e) {
      setErr(e.response?.data?.error || "Resend failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>OTP Verification</h2>

      <label>Email OTP</label>
      <OTPInputs value={emailOtp} onChange={setEmailOtp} />

      <label>Phone OTP</label>
      <OTPInputs value={phoneOtp} onChange={setPhoneOtp} />

      <div style={{ marginTop: 12 }}>
        <button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={handleResend}
          disabled={loading}
          style={{ marginLeft: 8 }}
        >
          Resend OTP
        </button>
      </div>

      {err && <p className="error">{err}</p>}
    </div>
  );
}
