import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useUserStore } from "../stores/useUserStore";
import { errorToast } from "../lib/toast";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, updateUser, loading } = useUserStore();
 const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (formData.password !== formData.confirmPassword) {
      return errorToast("Passwords do not match!");
    }

    if (formData.password && formData.password.length < 6) {
      return errorToast("Password must be at least 6 characters long!");
    }

    // Only send fields we want to update
    const updatedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ...(formData.password && { password: formData.password }),
    };

    updateUser(user._id, updatedData);
    window.location.reload()
  };

  const containerStyle = {
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    fontFamily: "sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "1200px",
    margin: "0 auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "30px",
  };

  const sectionStyle = {
    flex: "1",
    minWidth: "300px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2c2c2c",
    color: "#fff",
  };

  const buttonStyle = {
    padding: "12px 24px",
    marginTop: "30px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    alignSelf: "center",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const passwordContainerStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const eyeIconStyle = {
    position: "absolute",
    right: "12px",
    cursor: "pointer",
    color: "#ccc",
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...cardStyle, flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          {/* LEFT SECTION */}
          <div style={sectionStyle}>
            <h2 style={{ marginBottom: "20px", fontSize: "28px" }}>
              Basic Info
            </h2>

            <label style={labelStyle}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={labelStyle}>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* RIGHT SECTION */}
          <div style={sectionStyle}>
            <h2 style={{ marginBottom: "20px", fontSize: "28px" }}>
              Update Password
            </h2>

            <label style={labelStyle}>New Password</label>
            <div style={passwordContainerStyle}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
              />
              <span onClick={togglePassword} style={eyeIconStyle}>
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            <label style={labelStyle}>Confirm Password</label>
            <div style={passwordContainerStyle}>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={inputStyle}
              />
              <span onClick={togglePassword} style={eyeIconStyle}>
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
          </div>
        </div>
        

        {/* SINGLE UPDATE BUTTON */}

        <button disabled={loading} style={buttonStyle} onClick={handleUpdate}>
          {loading ? <PulseLoader color="#fff" size={6} /> : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
