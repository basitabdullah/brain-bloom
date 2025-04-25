import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { useSubscriptionStore } from "../stores/useSubscribeStore";
import axios from "../lib/axios";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const { subscribe, loading } = useSubscriptionStore();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    const order = await subscribe();

    if (!order) {
      console.error("Order not found!");
      return;
    }

    const options = {
      key: "rzp_test_ztjBz64y8emFWG",
      amount: order.subscription.amount,
      currency: "INR",
      name: "BrainBloom Premium",
      description: "Monthly Access",
      order_id: order.subscription.id,

      handler: async function (response) {
        const verifyResponse = await axios.post(
          "/subscribe/verify-subscription",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
        );

        if (verifyResponse.data.success) {
            onClose()
          navigate("/success");
        } else {
          navigate("/failure");
        }
      },
      prefill: {
        name: "Fahim Abdullah",
        email: "fahim@example.com",
      },
      theme: {
        color: "#000",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
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

          <button
            onClick={handleSubscribe}
            type="submit"
            className="subscribe-button"
            disabled={loading}
          >
            <FaCrown size={17} style={{ marginRight: "8px" }} />{" "}
            {loading ? (
              <PulseLoader size={8} color="#b1b1b1" />
            ) : (
              "₹199 Subscribe Now !"
            )}
          </button>
          <p className="modal__footer">
            By subscribing, you agree to our Terms of Service and our Privacy
            Policy.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubscriptionModal;
