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
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// /* ---------- PUBLIC UI PAGES ---------- */
// import MainPages from "./pages/MainPages";
// import Navbar from "./pages/Navbar";
// import SecondMain from "./pages/SecondMain";
// import Hostel_card from "./pages/Hostel_card";
// import FloatingContact from "./pages/FloatingContact";
// import NewItem from "./pages/NewItem";
// import Contact from "./pages/contact";
// import Lastone from "./pages/lastone";
// import Footer from "./pages/Footer";

// /* ---------- OWNER AUTH & DASHBOARD ---------- */
// import OwnerSignup from "./pages/OwnerSignup";
// import OwnerLogin from "./pages/OwnerLogin";
// import OTPVerification from "./pages/OTPVerification";
// import OwnerDashboard from "./pages/OwnerDashboard";

// /* ---------- PRIVATE ROUTE ---------- */
// function PrivateRoute({ children }) {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/owner-login" />;
// }

// /* ---------- HOME PAGE ---------- */
// function HomePage() {
//   return (
//     <>
//       <Navbar />
//       <MainPages />
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

// /* ---------- APP ROUTER ---------- */
// export default function App() {
//   return (
//     <Routes>

//       {/* Public Website */}
//       <Route path="/" element={<HomePage />} />

//       {/* Owner Auth */}
//       <Route path="/owner-signup" element={<OwnerSignup />} />
//       <Route path="/owner-login" element={<OwnerLogin />} />
//       <Route path="/verify-otp" element={<OTPVerification />} />

//       {/* Owner Dashboard Protected */}
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <OwnerDashboard />
//           </PrivateRoute>
//         }
//       />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/" />} />

//     </Routes>
//   );
// }


import React from "react";

/* ---------- PUBLIC UI ---------- */
import MainPages from "./pages/MainPages";
import Navbar from "./pages/Navbar";
import SecondMain from "./pages/SecondMain";
import Hostel_card from "./pages/Hostel_card";
import FloatingContact from "./pages/FloatingContact";
import NewItem from "./pages/NewItem";
import Contact from "./pages/contact";
import Lastone from "./pages/lastone";
import Footer from "./pages/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <MainPages />
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
