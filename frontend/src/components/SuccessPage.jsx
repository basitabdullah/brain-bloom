import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const containerStyle = {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    textAlign: "center",
  };

  const iconStyle = {
    fontSize: "5rem",
    color: "#4ade80",
    marginBottom: "1.5rem",
  };

  const titleStyle = {
    fontSize: "2.75rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const messageStyle = {
    fontSize: "1.2rem",
    maxWidth: "600px",
    marginBottom: "2rem",
    lineHeight: "1.6",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const linkStyle = {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: "#888",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    color: "#fff",
    transition: "background-color 0.3s",
    textDecoration: "none",
  };

  const handleClick = () => {
    navigate("/");
    window.location.reload(); // optional, depending on your use case
  };

  return (
    <div style={containerStyle}>
      <FiCheckCircle style={iconStyle} />
      <h1 style={titleStyle}>Subscription Successful!</h1>
      <p style={messageStyle}>
        You have subscribed successfully. <br />
        Your subscription will expire after a month.
      </p>
      <div style={buttonContainerStyle}>
        <button
          onClick={handleClick}
          style={{ ...linkStyle, backgroundColor: "#fff", color: "#000" }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
