import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCrown, FaArrowLeft } from "react-icons/fa";
import { useSubscriptionStore } from "../stores/useSubscribeStore";
import axiosInstance from "../lib/axios";
import { PulseLoader } from "react-spinners";

const SubscribePage = () => {
  const navigate = useNavigate();

  const containerStyles = {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const cardStyles = {
    backgroundColor: "#111",
    padding: "40px",
    borderRadius: "16px",
    maxWidth: "450px",
    textAlign: "center",
    boxShadow: "0 0 30px rgba(255, 255, 255, 0.05)",
  };

  const crownStyle = {
    fontSize: "48px",
    marginBottom: "20px",
    color: "#FFD700",
  };

  const headingStyles = {
    marginBottom: "10px",
    fontSize: "24px",
    lineHeight: "1.4",
  };

  const paragraphStyles = {
    color: "#aaa",
    fontSize: "15px",
    lineHeight: "1.6",
  };

  const buttonContainerStyles = {
    marginTop: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const buttonStyles = {
    padding: "14px 20px",
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "999px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const backButtonStyles = {
    ...buttonStyles,
    backgroundColor: "#222",
    color: "#fff",
    border: "1px solid #444",
  };

  const smallTextStyle = {
    fontSize: "12px",
    color: "#888",
    marginTop: "15px",
  };
  const glowingButtonStyles = {
    ...buttonStyles,
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
    animation: "glow 1.5s infinite alternate",
  };

  const { subscribe, loading } = useSubscriptionStore();

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
        const verifyResponse = await axiosInstance.post(
          "/subscribe/verify-subscription",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
        );

        if (verifyResponse.data.success) {
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

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <div style={crownStyle}>
          <FaCrown />
        </div>
        <h2 style={headingStyles}>
          Subscribe to BrainBloom <br /> Premium
        </h2>
        <p style={paragraphStyles}>
          Get unlimited access to all courses, exclusive content, and
          personalized learning paths at only <strong>Rs.199</strong> per month.
        </p>

        <div style={buttonContainerStyles} >
          <button disabled={loading} style={glowingButtonStyles} onClick={handleSubscribe}>
            <FaCrown />
            {loading ? (
              <PulseLoader size={8} color="#000" />
            ) : (
              "₹199 Subscribe Now !"
            )}
          </button>

          <button style={backButtonStyles} onClick={() => navigate("/")}>
            <FaArrowLeft />
            Back
          </button>
        </div>

        <p style={smallTextStyle}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
      <style>
        {`
    @keyframes glow {
      0% {
        box-shadow: 0 0 5px rgba(255, 215, 0, 0.4), 0 0 10px rgba(255, 215, 0, 0.2);
      }
      100% {
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6);
      }
    }
  `}
      </style>
    </div>
  );
};

export default SubscribePage;
