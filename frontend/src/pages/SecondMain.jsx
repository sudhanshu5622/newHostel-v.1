import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SecondMain.css";

import img1 from "../assets/image/12345.png";
import img2 from "../assets/image/studymain.jpg";
import img3 from "../assets/image/mainimg.jpg";

export default function SecondMain() {
  const slides = [
    {
      img: img1,
      title: "Find Your Ideal Student Hostel",
      desc: "Verified hostels with comfort, safety, and affordable pricing near your college.",
      btn: "Browse Hostels",
      link: "/schedule",
    },
    {
      img: img2,
      title: "Simple & Fast Online Booking",
      desc: "Book your hostel in minutes with transparent pricing and no hidden charges.",
      btn: "Book Instantly",
      link: "/schedule",
    },
    {
      img: img3,
      title: "Safe, Secure & Trusted Living",
      desc: "Genuine reviews, secure payments, and trusted hostel partners across cities.",
      btn: "Check Availability",
      link: "/JoinMeet",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slider-wrapper">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((item, i) => (
          <div className="slide" key={i}>
            <img src={item.img} alt={`Slide-${i + 1}`} />

            <div className="overlay"></div>

            <div className="content-box">
              <h1>{item.title}</h1>
              <p>{item.desc}</p>

              <Link to={item.link}>
                <button className="slide-btn">
                  {item.btn}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${current === i ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
