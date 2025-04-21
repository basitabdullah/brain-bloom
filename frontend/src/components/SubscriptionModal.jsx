import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { useSubscriptionStore } from "../stores/useSubscribeStore";
import axios from "../lib/axios";
import { PulseLoader } from "react-spinners";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const { subscribe, loading } = useSubscriptionStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await subscribe(); // ensure data is fetched first
    console.log(result);

    if (!result?.subscriptionId) {
      console.error("Subscription ID not available");
      return;
    }

    const options = {
      key: "rzp_test_ztjBz64y8emFWG", //use the sent id here
      subscription_id: result.subscriptionId,
      name: "BrainBloom Premium",
      description: "30-day subscription",
      handler: async function (response) {
        alert("Payment successful");
        console.log(response);
        const verifyResponse = await axios.post(
          "/subscribe/verify-subscription",
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            razorpay_subscription_id: response.razorpay_subscription_id,
          }
        );

        if (verifyResponse.data.success) {
          alert("Subscription activated!");
          onClose()
        } else {
          alert("Verification failed");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
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
            onClick={handleSubmit}
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
