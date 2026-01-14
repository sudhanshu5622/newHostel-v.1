//  // import Navbar from "./components/Navbar";
// import Hero from "./pages/hero";
// import Footer from "./pages/Footer";
// import Lastone from "./pages/lastone";
// import Contact from "./pages/contact"; 
// import SecondMain from "./pages/SecondMain";
// import NewItem from "./pages/NewItem";
// import Hostel_card from "./pages/Hostel_card";
// import FloatingContact from "./pages/FloatingContact"
// import Navbar from "./pages/Navbar";


// function App(){
//   return(
//     // <div className="flex flex-col h-screen overflow-hidden">
//     //   <Navbar />
//     //   <Hero />
//     //   <Footer/>
//     // </div>
//     <>
//       <Navbar/>
//       <Hero/>
//       <SecondMain />
//       <Hostel_card />
//       <FloatingContact/>
//       <NewItem />
//       <Contact /> 
//       <Lastone/>
//       <Footer/>
//     </>
//   )
// }

// export default App;


// App.jsx
// import Navbar from "./pages/Navbar";
// import Hero from "./pages/hero";
// import SecondMain from "./pages/SecondMain";
// import Hostel_card from "./pages/Hostel_card";
// import FloatingContact from "./pages/FloatingContact";
// import NewItem from "./pages/NewItem";
// import Contact from "./pages/contact";
// import Lastone from "./pages/lastone";
// import Footer from "./pages/Footer";

// function App() {
//   return (
//     <>
//       <Navbar />
//       {/* <Hero /> */}
//       <SecondMain />
//       <Hostel_card />
//       <FloatingContact />
//       <NewItem />
//       <Contact />
//       <Lastone />
//       <Footer />
//     </>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* ---------- PUBLIC UI PAGES ---------- */
import Navbar from "./pages/Navbar";
import Hero from "./pages/hero";
import SecondMain from "./pages/SecondMain";
import Hostel_card from "./pages/Hostel_card";
import FloatingContact from "./pages/FloatingContact";
import NewItem from "./pages/NewItem";
import Contact from "./pages/contact";
import Lastone from "./pages/lastone";
import Footer from "./pages/Footer";

/* ---------- OWNER AUTH & DASHBOARD ---------- */
import OwnerSignup from "./pages/OwnerSignup";
import OwnerLogin from "./pages/OwnerLogin";
import OTPVerification from "./pages/OTPVerification";
import OwnerDashboard from "./pages/OWnerDashboards";

/* ---------- PRIVATE ROUTE ---------- */
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

/* ---------- HOME PAGE LAYOUT ---------- */
function HomePage() {
  return (
    <>
      <Navbar />
      {/* <Hero /> */}
      <SecondMain />
      <Hostel_card />
      <FloatingContact />
      <NewItem />
      <Contact />
      <Lastone />
      <Footer />
    </>
  );
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <Routes>
      {/* Public Website */}
      <Route path="/" element={<HomePage />} />

      {/* Owner Auth */}
      <Route path="/owner-signup" element={<OwnerSignup />} />
      <Route path="/owner-login" element={<OwnerLogin />} />
      <Route path="/verify-otp" element={<OTPVerification />} />

      {/* Owner Dashboard (Protected) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <OwnerDashboard />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}



/* ===== APP ROUTER ===== */




// import { Routes, Route, Navigate } from 'react-router-dom';
// import AdminLogin from './pages/AdminLogin';
// import Dashboard from './pages/Dashboard';
// import Users from './pages/Users';
// import UserAProfile from './pages/UserProfile';
// import NotFound from './pages/NotFound';
// import ProtectedRoute from './components/ProtectedRoute';


// export default function App() {
// return (
// <Routes>
// <Route path="/admin/login" element={<AdminLogin />} />


// <Route
// path="/admin/*"
// element={
// <ProtectedRoute>
// <Routes>
// <Route path="" element={<Dashboard />} />
// <Route path="users" element={<Users />} />
// <Route path="users/:id" element={<UserAProfile />} />
// <Route path="*" element={<NotFound />} />
// </Routes>
// </ProtectedRoute>
// }
// />


// <Route path="/" element={<Navigate to="/admin" replace />} />
// <Route path="*" element={<NotFound />} />
// </Routes>
// );
// }