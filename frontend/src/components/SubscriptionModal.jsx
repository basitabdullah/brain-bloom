import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCrown } from "react-icons/fa";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !email || !phone) {
      setError("Please fill in all fields");
      return;
    }

    // Here you would typically handle the subscription logic
    console.log("Subscription attempted with:", { name, email, phone });

    // Clear form and close modal
    setName("");
    setEmail("");
    setPhone("");
    setError("");
    onClose();

    // Show success message (you could implement a toast notification here)
    alert("Thank you for subscribing to BrainBloom!");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal subscription-modal"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
          <div className="modal__header">
            <FaCrown size={32} className="subscription-icon" />
            <h2>Subscribe to BrainBloom Premium</h2>
          </div>

          <p className="modal__subtitle">
            Get unlimited access to all courses, exclusive content, and
            personalized learning paths at only Rs.199 per month
          </p>

          <button type="submit" className="subscribe-button">
            <FaCrown size={17} style={{ marginRight: "8px" }} /> Subscribe Now
          </button>
          <p className="modal__footer">
            By subscribing, you agree to our Terms of Service and our Privacy Policy.
            
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubscriptionModal;
