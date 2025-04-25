import React, { useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useUserStore } from "../stores/useUserStore";
import { useSubscriptionStore } from "../stores/useSubscribeStore";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const SubscriptionDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { user } = useUserStore();
  const { cancelSubscription, loading } = useSubscriptionStore();

  if (!user) {
    return navigate("/");
  }

  const handleCancelSubcription = () => {
    cancelSubscription(user._id);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const styles = {
    container: {
      backgroundColor: "#000",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "sans-serif",
      padding: "20px",
    },
    card: {
      backgroundColor: "#111",
      padding: "40px",
      borderRadius: "16px",
      border: "1px solid #333",
      width: "100%",
      maxWidth: "480px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
    title: {
      fontSize: "28px",
      marginBottom: "20px",
      fontWeight: "bold",
      textAlign: "center",
      color: "#fff",
      textTransform: "uppercase",
    },
    infoBlock: {
      marginBottom: "20px",
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: "#1a1a1a",
      borderLeft: "4px solid #555",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    label: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#ccc",
    },
    value: {
      fontSize: "17px",
      fontWeight: "bold",
      color: "#fff",
      wordBreak: "break-word",
    },
    status: {
      display: "flex",
      alignItems: "center",
      color: user.role === "subscriber" ? "#4CAF50" : "#FF6347", // green for active, red for inactive
      fontWeight: "bold",
      gap: "8px",
      fontSize: "18px",
      justifyContent: "center",
      marginTop: "15px",
    },
    cancelBtn: {
      backgroundColor: "#222",
      color: "#fff",
      padding: "14px 20px",
      border: "1px solid #444",
      borderRadius: "8px",
      marginTop: "25px",
      cursor: "pointer",
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
      transition: "background-color 0.3s ease",
    },
    cancelBtnHover: {
      backgroundColor: "#333",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
    modal: {
      backgroundColor: "#111",
      padding: "30px",
      borderRadius: "12px",
      width: "350px",
      textAlign: "center",
      color: "#fff",
      border: "1px solid #333",
    },
    modalButton: {
      backgroundColor: "#fff",
      color: "#000",
      padding: "10px 16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      marginTop: "20px",
      marginRight: "10px",
      transition: "background-color 0.3s ease",
    },
    cancelModalButton: {
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px 16px",
      borderRadius: "6px",
      border: "1px solid #555",
      cursor: "pointer",
      fontWeight: "bold",
      marginTop: "20px",
      transition: "background-color 0.3s ease",
    },
    modalButtonHover: {
      backgroundColor: "#ddd",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>🖤 Subscription Info</div>

        <div style={styles.infoBlock}>
          <span style={styles.label}>Membership</span>
          <span style={styles.value}>
            {user.role === "subscriber" ? "Premium Member" : "Free Member"}
          </span>
        </div>

        {user.role === "subscriber" && (
          <>
            <div style={styles.infoBlock}>
              <span style={styles.label}>Start Date</span>
              <span style={styles.value}>
                {new Date(user.subscriptionStart).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>

            <div style={styles.infoBlock}>
              <span style={styles.label}>End Date</span>
              <span style={styles.value}>
                {new Date(user.subscriptionEnd).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          </>
        )}

        <div style={styles.status}>
          {user.role === "subscriber" ? (
            <>
              <FiCheckCircle size={20} />
              Active Subscription
            </>
          ) : (
            <>
              <FiXCircle size={20} />
              Inactive Subscription
            </>
          )}
        </div>

        {user.role === "subscriber" && (
          <button
            style={styles.cancelBtn}
            onClick={() => setShowModal(true)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#222")}
          >
            Cancel Subscription
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Are you sure?</h2>
            <p>
              This action <strong>cannot be undone</strong>. Your subscription
              will be cancelled immediately.
            </p>
            <div>
              <button
                style={styles.modalButton}
                onClick={() => setShowModal(false)}
              >
                Go Back
              </button>
              <button
                style={styles.cancelModalButton}
                onClick={() => {
                  setShowModal(false);
                  handleCancelSubcription();
                }}
              >
                {loading ? <ClipLoader color="#fff" /> : "Yes, Cancel It"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetail;
