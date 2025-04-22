import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerStyle = {
    backgroundColor: '#121212',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',               // Center horizontally and vertically
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    fontFamily: 'sans-serif',
  };

  const cardStyle = {
    backgroundColor: '#1e1e1e',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px'
  };

  const sectionStyle = {
    flex: '1',
    minWidth: '300px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2c2c2c',
    color: '#fff',
  };

  const buttonStyle = {
    padding: '10px 20px',
    marginTop: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const passwordContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const eyeIconStyle = {
    position: 'absolute',
    right: '12px',
    cursor: 'pointer',
    color: '#ccc',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* LEFT SECTION */}
        <div style={sectionStyle}>
          <h2 style={{ marginBottom: '20px',fontSize : "28px" }}>Basic Info</h2>

          <label style={labelStyle}>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />

          <label style={labelStyle}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />

          <label style={labelStyle}>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} />

          <button style={buttonStyle}>Update Info</button>
        </div>

        {/* RIGHT SECTION */}
        <div style={sectionStyle}>
          <h2 style={{ marginBottom: '20px', fontSize : "28px" }}>Update Password</h2>

          <label style={labelStyle}>New Password</label>
          <div style={passwordContainerStyle}>
            <input
              type={showPassword ? 'text' : 'password'}
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
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
            />
            <span onClick={togglePassword} style={eyeIconStyle}>
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <button style={{ ...buttonStyle, backgroundColor: '#2196F3' }}>Update Password</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
