import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";
import { ClipLoader } from "react-spinners";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/mail/forgot-password", { email });
      successToast("Check your email for the reset link");
      setTimer(60); // Start 60s cooldown
      setLoading(false);
    } catch (err) {
      errorToast(err.response?.data?.message || "Internal Server Error!");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={styles.input}
          required
        />

        <button disabled={loading || timer > 0} type="submit" style={styles.button}>
          {loading ? (
            <ClipLoader size={8} color="#fff" />
          ) : timer > 0 ? (
            `Resend in ${timer}s`
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "300px",
  },
  heading: {
    color: "#fff",
    margin: "0 0 12px 0",
    fontSize: "22px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #333",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.2s ease-in-out",
  },
};
