// import React from "react";
// import PaymentCard from "../components/PaymentCard";

// const Payment = () => {
//   // Example data, can come from API or context
//   const paymentDetails = {
//     userName: "Ankit Yadav",
//     hostelName: "Sunrise Hostel",
//     hostelId: "HST12345",
//     amount: "2000",
//     email: "ankit@example.com",
//   };

//   return (
//     <div className="payment-page">
//       <h1>Complete Your Payment</h1>
//       <PaymentCard details={paymentDetails} />
//     </div>
//   );
// };

// export default Payment;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const loadRazorpay = async () => {
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 3000,
        hostelName: "Green Valley Hostel",
        userName: "Ankit Yadav",
        userId: "USER123",
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Payment failed");
      return;
    }

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: "INR",
      name: "Hostel Booking",
      description: "Hostel Advance Payment",
      order_id: data.order.id,
      handler: async function (response) {
        const verifyRes = await fetch(
          "http://localhost:5000/api/payment/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              amount: data.order.amount / 100,
              hostelName: data.hostelName,
              userName: data.userName,
              userId: "USER123",
            }),
          }
        );

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          navigate("/payment-success", {
            state: verifyData.receipt,
          });
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: data.userName,
        email: "user@email.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  return <h2 style={{ textAlign: "center" }}>Redirecting to payment...</h2>;
};

export default Payment;
