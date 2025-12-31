import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import "./FloatingContact.css";

const contacts = {
  whatsapp: {
    number: "6203478470",
    message: "Hi! I want to inquire about your hostels.",
  },
  call: {
    number: "6203478470",
  },
};

const FloatingContact = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="floating-contact">
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="float-btn main"
        onClick={() => setShowOptions(!showOptions)}
      >
        <MessageCircle size={24} />
      </motion.div>

      
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="options"
          >
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${contacts.whatsapp.number}?text=${encodeURIComponent(
                contacts.whatsapp.message
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="float-btn whatsapp"
              title="Chat on WhatsApp"
            >
              <MessageCircle size={20} />
            </a>

            {/* Call */}
            <a
              href={`tel:${contacts.call.number}`}
              className="float-btn call"
              title="Call Now"
            >
              <Phone size={20} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};


export default FloatingContact;
