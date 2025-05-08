import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // 👈 Eye icons

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`auth/reset-password/${token}`, { password });
      successToast("Password reset successfully");
      nav("/");
    } catch (err) {
      errorToast("Error resetting password");
      nav("/");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Reset Password</h2>
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            style={styles.input}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} color="#aaa" />
            ) : (
              <AiOutlineEye size={20} color="#aaa" />
            )}
          </span>
        </div>
        <button type="submit" style={styles.button}>
          Reset Password
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
  passwordWrapper: {
    position: "relative",
  },
  input: {
    padding: "10px 40px 10px 10px",
    borderRadius: "8px",
    border: "1px solid #333",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    fontSize: "14px",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
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
