// import { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import "./OwnerAuth.css";
// const API_BASE_URL = "http://localhost:5000";
// //const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
// axios.get("http://localhost:5000/api/auth/is-auth", {
//   withCredentials: true
// });

// export default function OwnerAuth() {

//   const [mode, setMode] = useState("login");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // ================= OWNER REGISTER =================
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setMessage("❌ Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/api/owner/register`,
//         {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password
//         },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setMessage("✅ Registration successful. Please login.");
//         setMode("login");
//       } else {
//         setMessage("❌ " + res.data.message);
//       }

//     } catch (err) {
//       setMessage(err.response?.data?.message || "❌ Registration Failed");
//     }

//     setLoading(false);
//   };

//   // ================= OWNER LOGIN =================
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/api/owner/login`,
//         {
//           email: formData.email,
//           password: formData.password
//         },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         localStorage.setItem("ownerToken", res.data.token);
//         localStorage.setItem("owner", JSON.stringify(res.data.owner));

//         setMessage("✅ Login successful");
//         setTimeout(() => {
//           window.location.href = "/owner-dashboard";
//         }, 1000);
//       } else {
//         setMessage("❌ " + res.data.message);
//       }

//     } catch (err) {
//       setMessage(err.response?.data?.message || "❌ Login Failed");
//     }

//     setLoading(false);
//   };

//   // ================= UI =================
//   return (
//     <div className="auth-page">
//       <motion.div
//         className="auth-container"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >

//         {/* LEFT */}
//         <div className="auth-left">
//           <img
//             src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
//             alt="hostel"
//           />
//           <h2>Hostel Owner Portal</h2>
//           <p>Manage rooms, bookings and payments</p>
//         </div>

//         {/* RIGHT */}
//         <div className="auth-right">

//           <h3>{mode === "login" ? "Owner Login" : "Owner Registration"}</h3>

//           <form onSubmit={mode === "login" ? handleLogin : handleRegister}>

//             {mode === "register" && (
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             )}

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             {mode === "register" && (
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             )}

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />

//             {mode === "register" && (
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//             )}

//             <button type="submit" disabled={loading}>
//               {loading
//                 ? "Please wait..."
//                 : mode === "login"
//                 ? "Login"
//                 : "Sign Up"}
//             </button>

//           </form>

//           {message && <p className="message">{message}</p>}

//           <p>
//             {mode === "login"
//               ? "Don't have an account?"
//               : "Already have an account?"}

//             <span
//               style={{ cursor: "pointer", color: "blue" }}
//               onClick={() =>
//                 setMode(mode === "login" ? "register" : "login")
//               }
//             >
//               {mode === "login" ? " Sign Up" : " Login"}
//             </span>
//           </p>

//         </div>
//       </motion.div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import "./OwnerAuth.css";

// const API_BASE_URL = "http://localhost:5000";

// export default function OwnerAuth() {

//   const [mode, setMode] = useState("login");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ===== CHECK AUTH =====
//   useEffect(() => {
//     axios.get(`${API_BASE_URL}/api/auth/is-auth`, {
//       withCredentials: true
//     })
//     .then(res => console.log("Auth:", res.data))
//     .catch(err => console.log(err));
//   }, []);

//   // ===== HANDLE CHANGE =====
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // ===== REGISTER =====
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       return setMessage("Passwords do not match");
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${API_BASE_URL}/api/owner/register`,
//         {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password
//         },
//         { withCredentials: true }
//       );

//       setMessage(res.data.message);
//       setMode("login");

//     } catch (err) {
//       setMessage("Registration failed");
//     }

//     setLoading(false);
//   };

//   // ===== LOGIN =====
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${API_BASE_URL}/api/owner/login`,
//         {
//           email: formData.email,
//           password: formData.password
//         },
//         { withCredentials: true }
//       );

//       localStorage.setItem("ownerToken", res.data.token);
//       localStorage.setItem("owner", JSON.stringify(res.data.owner));

//       setMessage("Login successful");

//     } catch (err) {
//       setMessage("Login failed");
//     }

//     setLoading(false);
//   };

//   // ===== UI =====
//   return (
//     <div className="auth-page">
//       <motion.div className="auth-container">

//         <div className="auth-left">
//           <h2>Hostel Owner Portal</h2>
//         </div>

//         <div className="auth-right">

//           <h3>{mode === "login" ? "Owner Login" : "Owner Registration"}</h3>

//           <form onSubmit={mode === "login" ? handleLogin : handleRegister}>

//             {mode === "register" &&
//               <input name="name" placeholder="Full Name" onChange={handleChange} />
//             }

//             <input name="email" placeholder="Email" onChange={handleChange} />

//             {mode === "register" &&
//               <input name="phone" placeholder="Phone" onChange={handleChange} />
//             }

//             <input type="password" name="password" placeholder="Password" onChange={handleChange} />

//             {mode === "register" &&
//               <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
//             }

//             <button type="submit">
//               {mode === "login" ? "Login" : "Register"}
//             </button>

//           </form>

//           <p onClick={() => setMode(mode === "login" ? "register" : "login")}>
//             {mode === "login" ? "Create Account" : "Go to Login"}
//           </p>

//         </div>

//       </motion.div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./OwnerAuth.css";

// const API_BASE_URL = "http://localhost:4000/api/owner/register";

// export default function OwnerAuth() {

//   const navigate = useNavigate();

//   const [mode, setMode] = useState("login");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // ================= CHECK AUTH ON LOAD =================
//   useEffect(() => {
//     axios.get(`${API_BASE_URL}/api/auth/is-auth`, {
//       withCredentials: true
//     })
//     .then(res => {
//       if (res.data.success) {
//         navigate("/owner-dashboard");   // already logged in
//       }
//     })
//     .catch(() => {});
//   }, [navigate]);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   // ================= REGISTER =================
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");

//     if (formData.password !== formData.confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${API_BASE_URL}/api/owner/register`,
//         {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password
//         },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setMessage("Registration successful. Please login.");
//         setMode("login");
//       } else {
//         setError(res.data.message);
//       }

//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }

//     setLoading(false);
//   };

//   // ================= LOGIN =================
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${API_BASE_URL}/api/owner/login`,
//         {
//           email: formData.email,
//           password: formData.password
//         },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         localStorage.setItem("ownerToken", res.data.token);
//         localStorage.setItem("owner", JSON.stringify(res.data.owner));

//         setMessage("Login successful");

//         setTimeout(() => {
//           navigate("/owner-dashboard");
//         }, 800);
//       } else {
//         setError(res.data.message);
//       }

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }

//     setLoading(false);
//   };

//   // ================= UI =================
//   return (
//     <div className="auth-page">
//       <motion.div
//         className="auth-container"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//       >

//         {/* LEFT */}
//         <div className="auth-left">
//           <h2>Hostel Owner Portal</h2>
//           <p>Manage hostels, rooms & bookings</p>
//         </div>

//         {/* RIGHT */}
//         <div className="auth-right">

//           <h3>{mode === "login" ? "Owner Login" : "Owner Registration"}</h3>

//           <form onSubmit={mode === "login" ? handleLogin : handleRegister}>

//             {mode === "register" &&
//               <input
//                 name="name"
//                 placeholder="Full Name"
//                 onChange={handleChange}
//                 required
//               />
//             }

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               required
//             />

//             {mode === "register" &&
//               <input
//                 name="phone"
//                 placeholder="Phone"
//                 onChange={handleChange}
//                 required
//               />
//             }

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               required
//             />

//             {mode === "register" &&
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 onChange={handleChange}
//                 required
//               />
//             }

//             <button type="submit" disabled={loading}>
//               {loading
//                 ? "Please wait..."
//                 : mode === "login"
//                 ? "Login"
//                 : "Register"}
//             </button>

//           </form>

//           {/* Messages */}
//           {message && <p className="success">{message}</p>}
//           {error && <p className="error">{error}</p>}

//           <p className="switch">
//             {mode === "login"
//               ? "Don't have an account?"
//               : "Already have an account?"}

//             <span onClick={() => setMode(mode === "login" ? "register" : "login")}>
//               {mode === "login" ? " Sign Up" : " Login"}
//             </span>
//           </p>

//         </div>

//       </motion.div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OwnerAuth.css";

// ✅ Correct Base URL
const API_BASE_URL = "http://localhost:4000/api/owner";

export default function OwnerAuth() {

  const navigate = useNavigate();
  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= CHECK AUTH =================
  useEffect(() => {
    axios.get(`${API_BASE_URL}/is-auth`)
      .then(res => {
        if (res.data.success) {
          navigate("/owner-services");
        }
      })
      .catch(() => {});
  }, [navigate]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/register`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }
      );

      if (res.data.success) {
        setMessage("Registration successful. Please login.");
        setMode("login");
      } else {
        setError(res.data.message);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/login`,
        {
          email: formData.email,
          password: formData.password
        }
      );

      if (res.data.success) {
        localStorage.setItem("ownerToken", res.data.token);
        localStorage.setItem("owner", JSON.stringify(res.data.owner));

        setMessage("Login successful");

        setTimeout(() => {
          navigate("/owner-services");
        }, 800);
      } else {
        setError(res.data.message);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  // ================= UI =================
  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* LEFT SIDE */}
        <div className="auth-left">
          <h2>Hostel Owner Portal</h2>
          <p>Manage hostels, rooms & bookings</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">

          <h3>{mode === "login" ? "Owner Login" : "Owner Registration"}</h3>

          <form onSubmit={mode === "login" ? handleLogin : handleRegister}>

            {mode === "register" &&
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            }

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            {mode === "register" &&
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                required
              />
            }

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            {mode === "register" &&
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
            }

            <button type="submit" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
            </button>

          </form>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}

          <p className="switch">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <span
              onClick={() =>
                setMode(mode === "login" ? "register" : "login")
              }
            >
              {mode === "login" ? " Sign Up" : " Login"}
            </span>
          </p>

        </div>

      </motion.div>
    </div>
  );
}
