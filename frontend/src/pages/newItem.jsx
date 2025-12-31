import React from "react";
import { motion } from "framer-motion";
import "./newItem.css";
import { slides } from "../assets/data";

export default function NewItem() {
  return (
    <section className="hori-container">
      <h2 className="main-heading">Special PG Features & Discounts</h2>

      <motion.div
        className="hori-slider"
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {slides?.length ? (
          slides.map((item, index) => (
            <motion.div
              key={index}
              className="hori-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.discount && (
                <span className="offer-badge">{item.discount}</span>
              )}

              <div className="hori-img-wrapper">
                <img
                  src={item.image}
                  alt={item.title || "PG Offer Image"}
                  className="hori-img"
                  loading="lazy"
                />
              </div>

              <h3 className="hori-title">{item.title}</h3>

              {item.desc && <p className="hori-desc">{item.desc}</p>}

              {item.points?.length ? (
                <ul className="hori-points">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          ))
        ) : (
          <p className="no-data">No offers available right now.</p>
        )}
      </motion.div>
    </section>
  );
}
