// import React from "react";

// const PaymentSuccess = () => {
//   return (
//     <div className="payment-success">
//       <h1>Payment Successful ✅</h1>
//       <p>Thank you for your payment. Your hostel booking is confirmed!</p>
//     </div>
//   );
// };

// export default PaymentSuccess;
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();

  return (
    <div style={{ padding: 20 }}>
      <h2>✅ Payment Successful</h2>
      <p>Payment ID: {state.paymentId}</p>
      <p>Hostel: {state.hostelName}</p>
      <p>Amount: ₹{state.amount}</p>
      <p>Date: {new Date(state.date).toLocaleString()}</p>
    </div>
  );
};

export default PaymentSuccess;
