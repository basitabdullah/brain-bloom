import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginModal = ({ isOpen, onClose, onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Here you would typically handle the login logic
    // For now, we'll just simulate a successful login
    console.log('Login attempted with:', { email });
    
    // Clear form and close modal
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    onClose(); // Close login modal
    onSignupClick(); // Open signup modal
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
          className="modal"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal__close" onClick={onClose}>×</button>
          <h2>Log In to BrainBloom</h2>
          
          {error && <div className="modal__error">{error}</div>}
          
          <form className="modal__form" onSubmit={handleSubmit}>
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
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn--primary">Log In</button>
          </form>
          
          <div className="modal__footer">
            <p>
              Don't have an account? <a href="#" onClick={handleSignupClick}>Sign Up</a>
            </p>
            <p className="modal__forgot-password">
              <a href="#" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal; 