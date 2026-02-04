// router.jsx
// import { createBrowserRouter } from "react-router-dom";
// import { RouterProvider} from "react-router-dom";
// import App from "./App";
// import OwnerAuth from "./pages/OwnerAuth";
// import OwnerDashboard from "./pages/OwnerDashboard";

// const router = createBrowserRouter([
//   { path: "/", element: <App /> },                       // Public Home
//   { path: "/owner-services", element: <OwnerAuth /> },    // Login / Signup
//   { path: "/owner-services/dashboard", element: <OwnerDashboard /> }, // Dashboard
// ]);

// export default router;


// router.jsx
// router.jsx
// import React from "react";
// import { createBrowserRouter } from "react-router-dom";

// /* Public / App pages */
// import App from "./App";
// import Login from "./Login";
// import Signup from "./Signup";
// import ResetPassword from "./ResetPassword";
// import JoinMeet from "./JoinMeet";

// /* Protected pages */
// import Schedule from "./Schedule";
// import UserProfile from "./UserMProfile";
// import ProtectedRoute from "./ProtectedRoute";
// import AuthRedirect from "./AuthRedirect";
// import { AuthProvider } from "./AuthContext";

// /* Owner / Payment pages */
// import OwnerAuth from "./pages/OwnerAuth";
// import OwnerDashboard from "./pages/OwnerDashboard";
// import Payment from "./pages/Payment";
// import PaymentSuccess from "./pages/PaymentSuccess";

// /*
//   Single router definition that includes:
//   - public routes
//   - auth-wrapped login/signup
//   - protected routes wrapped with ProtectedRoute
//   - owner/payment routes
// */
// export const router = createBrowserRouter([
//   // Public / landing
//   { path: "/", element: <App /> },

//   // Auth related
//   {
//     path: "/login",
//     element: (
//       <AuthRedirect>
//         <Login />
//       </AuthRedirect>
//     ),
//   },
//   {
//     path: "/signup",
//     element: (
//       <AuthRedirect>
//         <Signup />
//       </AuthRedirect>
//     ),
//   },
//   { path: "/resetpass", element: <ResetPassword /> },
//   { path: "/joinmeet", element: <JoinMeet /> },

//   //Owner pages
//   { path: "/owner-services", element: <OwnerAuth /> },
//   { path: "/owner-services/dashboard", element: <OwnerDashboard /> },

//   // Payment flow
//   { path: "/payment", element: <Payment /> },
//   { path: "/payment-success", element: <PaymentSuccess /> },

//   // Protected routes (use ProtectedRoute wrapper)
//   {
//     path: "/userprofile",
//     element: (
//       <ProtectedRoute>
//         <UserProfile />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/schedule",
//     element: (
//       <ProtectedRoute>
//         <Schedule />
//       </ProtectedRoute>
//     ),
//   },
//   {
//   path: "/payment",
//   element: (
//     <ProtectedRoute>
//       <Payment />
//     </ProtectedRoute>
//   ),
// },

//  import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RoleCards from "./RoleCards";
// import OwnerSignup from "./pages/OwnerSignup";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<RoleCards />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signowner-services" element={<OwnerSignup />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
//   // Fallback (optional) - you can point to a 404 component if you have one
//   // { path: "*", element: <NotFound /> },
// ]);

// import React from "react";
// import { createBrowserRouter, Navigate } from "react-router-dom";
// import App from "./App";

// /* ---------- AUTH PAGES ---------- */
// import Login from "./Login";
// import Signup from "./Signup";
// import ResetPassword from "./ResetPassword";
// import JoinMeet from "./JoinMeet";

// /* ---------- OWNER PAGES ---------- */
// import OwnerLogin from "./pages/OwnerLogin";
// import OwnerSignup from "./pages/OwnerSignup";
// import OwnerDashboard from "./pages/OwnerDashboard";

// /* ---------- PRIVATE ROUTE ---------- */
// // function PrivateRoute({ children }) {
// //   const token = localStorage.getItem("token");
// //   return token ? children : <Navigate to="/owner-login" />;
// // }

// export const router = createBrowserRouter([
  
//   /* Main Website Layout */
//   {
//     path: "/",
//     element: <App />,
//   },

//   /* Auth */
//   { path: "/login", element: <Login /> },
//   { path: "/signup", element: <Signup /> },
//   { path: "/resetpass", element: <ResetPassword /> },
//   { path: "/joinmeet", element: <JoinMeet /> },

//   /* Owner */
//   { path: "/owner-login", element: <OwnerLogin /> },
//   { path: "/owner-signup", element: <OwnerSignup /> },

//   /* Dashboard Protected */
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <OwnerDashboard />
//       </PrivateRoute>
//     ),
//   },

// ]);
import React from "react";
import { createBrowserRouter } from "react-router-dom";

/* Public / App pages */
import App from "./App";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import JoinMeet from "./JoinMeet";

/* Protected pages */
import Schedule from "./Schedule";
import UserProfile from "./UserMProfile";
import ProtectedRoute from "./ProtectedRoute";
import AuthRedirect from "./AuthRedirect";
import { AuthProvider } from "./AuthContext";

/* Owner / Payment pages */
import OwnerAuth from "./pages/OwnerAuth";
import OwnerDashboard from "./pages/OwnerDashboard";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

/*
  Single router definition that includes:
  - public routes
  - auth-wrapped login/signup
  - protected routes wrapped with ProtectedRoute
  - owner/payment routes
*/
export const router = createBrowserRouter([
  // Public / landing
  { path: "/", element: <App /> },

  // Auth related
  {
    path: "/login",
    element: (
      <AuthRedirect>
        <Login />
      </AuthRedirect>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRedirect>
        <Signup />
      </AuthRedirect>
    ),
  },
  { path: "/resetpass", element: <ResetPassword /> },
  { path: "/joinmeet", element: <JoinMeet /> },

  //Owner pages
  { path: "/owner-services", element: <OwnerAuth /> },
  { path: "/owner-services/dashboard", element: <OwnerDashboard /> },

  // Payment flow
  { path: "/payment", element: <Payment /> },
  { path: "/payment-success", element: <PaymentSuccess /> },

  // Protected routes (use ProtectedRoute wrapper)
  {
    path: "/userprofile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/schedule",
    element: (
      <ProtectedRoute>
        <Schedule />
      </ProtectedRoute>
    ),
  },
  {
  path: "/payment",
  element: (
    <ProtectedRoute>
      <Payment />
    </ProtectedRoute>
  ),
},

  // Fallback (optional) - you can point to a 404 component if you have one
  // { path: "*", element: <NotFound /> },
]);