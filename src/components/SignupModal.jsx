import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SignupModal = ({ isOpen, onClose, onLoginClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Here you would typically handle the signup logic
    console.log('Signup attempted with:', { name, email });
    
    // Clear form and close modal
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onClose(); // Close signup modal
    onLoginClick(); // Open login modal
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
            <button type="submit" className="btn btn--primary">Create Account</button>
          </form>
          <p className="modal__footer">
            Already have an account? <a href="#" onClick={handleLoginClick}>Log In</a>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignupModal;