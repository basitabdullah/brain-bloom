import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useMailerStore } from "../stores/useMailerStore";

const SignupModal = ({ isOpen, onClose, onLoginClick }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [error, setError] = useState("");

  const { register } = useUserStore();
  const {loading,verifyMail} = useMailerStore()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phone || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    register({ name, email, password, phone });

    setError("");
    setEmailModalOpen(true); // 🔄 Open email verification modal
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onClose(); // Close signup modal
    onLoginClick(); // Open login modal
  };

  const handleEmailModalClose = () => {
    setEmailModalOpen(false);
    onClose(); // Optionally close everything
  };


  const handleVerifyEmail = async()=>{
    verifyMail(email)
    handleEmailModalClose()
  }
  return (
    <>
      {/* Main Sign Up Modal */}
      <AnimatePresence>
        {isOpen && !emailModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal__close" onClick={onClose}>
                ×
              </button>
              <h2>Sign Up for BrainBloom</h2>
              {error && <div className="modal__error">{error}</div>}
              <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="modal__form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="modal__form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="modal__form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="modal__form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary">
                  Create Account
                </button>
              </form>
              <p className="modal__footer">
                Already have an account?{" "}
                <a href="#" onClick={handleLoginClick}>
                  Log In
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Verification Modal */}
      <AnimatePresence>
        {emailModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // onClick={handleEmailModalClose}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* <button className="modal__close" onClick={handleEmailModalClose}>
                ×
              </button> */}
              <h3>Verify your email</h3>
              <p style={{
                fontSize:"10px",
                color :"red"
              }}>*If you do not verify your email now your account will be terminated on next login.</p>
              <p>We sent a verification email to :</p>
              <input
                style={{
                  marginRight: "10px",
                  padding: "14px",
                  fontSize: "0.85rem",
                  width: "70%",
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  outline: "none",
                  color: "white",
                  cursor: "not-allowed",
                }}
                type="email"
                readOnly
                value={email}
              />
              <button className="btn btn--primary" onClick={handleVerifyEmail}>{loading ? "sending": "Verify Email"}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignupModal;
