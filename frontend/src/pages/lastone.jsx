
// function lastone() {
//   return (
//     <div className="main">
//       <div className="conatent">
//         <h1>
         
//           Frequently ask <span> Question</span>
//         </h1>
//       </div>
//     </div>
//   );
// }

// export default lastone;

import "./lastone.css";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const faqs = [
  {
    question: "How is my booking confirmed?",
    answer:
     
      "Once you complete your booking and payment, you will receive a confirmation email and SMS with all the details of your booking, including the hostel address and contact information. You can also view your booking status in the My Bookings section of the app."
  },
  {
    question: "Can I cancel my booking?",
    answer:
     "Yes, you can cancel your booking. The cancellation policy varies depending on the hostel. Please check the specific hostel's cancellation policy at the time of booking or in your confirmation details. Some bookings may be non-refundable or have a cancellation fee."
  },
  {
    question: "What if the hostel denies entry?",
    answer:
     "In the rare event that a hostel denies entry despite a confirmed booking, please contact our customer support immediately. We will assist you in resolving the issue or finding alternative accommodation. Ensure you have your booking confirmation readily available."
    
  },
  {
    question: "What is the refund process?",
    answer:
    "If your booking is eligible for a refund as per the cancellation policy, the refund will be processed to your original mode of payment. It typically takes 5-7 business days for the amount to reflect in your account, depending on your bank."
  },
  {
  question: "Is it safe to pay online?",
  answer: "Absolutely. We use industry-standard encryption and secure payment gateways to ensure all your online transactions are safe and protected. Your financial information is never stored on our servers."
}

];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked <span>Questions</span> </h1>
      <p className="Radha">Find answers to common questions about our services and booking process</p>

      <div className="faq-list">
        {faqs.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>

              <motion.span
                className="arrow"
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="faq-answer-wrapper"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <p className="faq-answer">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
