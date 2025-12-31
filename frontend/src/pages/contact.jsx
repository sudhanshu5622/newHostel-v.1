import React, { useState } from "react";
import "./contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      "https://script.google.com/macros/s/AKfycbxIM3pi7ekogv7KTYIZ_9E7FO7u048pz7Ahh02aruFEMZjZSftmzWVbXIj8CnsT2RoWWA/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      }
    );

    alert("Message Sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="meso">
      <h1 className="contact-heading">Contact Us</h1>

      <div className="contact-row">
        {/* LEFT SIDE – TEXT */}
        <div className="point_of_view">
          <h1>
            Have questions about
            <span> bookings </span>
            or
            <span> hostels?</span>
          </h1>

          <p>
            Fill out the form with your details, or contact the relevant
            department using the email provided. We’re here to help you
            every step of the way.
          </p>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div className="contact-container">
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
