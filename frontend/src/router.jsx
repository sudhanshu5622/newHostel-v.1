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

  // Owner pages
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
