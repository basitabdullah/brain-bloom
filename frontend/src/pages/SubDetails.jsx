import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const SubscriptionDetail = () => {
  const [showModal, setShowModal] = useState(false);

  const subscription = {
    isPremium: true,
    subscriptionStart: '2025-04-21T06:36:41.265+00:00',
    subscriptionEnd: '2025-05-21T06:36:41.265+00:00',
  };

  const isActive = new Date(subscription.subscriptionEnd) > new Date();

  const containerStyle = {
    backgroundColor: '#121212',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    padding: '20px',
    position: 'relative',
  };

  const cardStyle = {
    backgroundColor: '#1e1e1e',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
    width: '420px',
    border: '1px solid #2e2e2e',
  };

  const titleStyle = {
    fontSize: '26px',
    marginBottom: '25px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00ffff',
    letterSpacing: '1px',
  };

  const infoBlock = {
    marginBottom: '20px',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#2b2b2b',
    borderLeft: '4px solid #00ffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const labelStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#aaa',
  };

  const valueStyle = {
    fontSize: '17px',
    fontWeight: 'bold',
    color: '#fff',
  };

  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    color: isActive ? '#4CAF50' : '#FF4C4C',
    fontWeight: 'bold',
    gap: '8px',
    fontSize: '17px',
    justifyContent: 'center',
    marginTop: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#ff4444',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    marginTop: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  };

  const modalOverlay = {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  };

  const modalStyle = {
    backgroundColor: '#1e1e1e',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
    width: '350px',
    textAlign: 'center',
    color: '#fff',
    border: '1px solid #333',
  };

  const modalButtonStyle = {
    backgroundColor: '#00ffff',
    color: '#000',
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '20px',
    marginRight: '10px',
  };

  const cancelModalButton = {
    backgroundColor: '#ff4444',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>🌐 Subscription Info</div>

        <div style={infoBlock}>
          <span style={labelStyle}>Membership</span>
          <span style={valueStyle}>
            {subscription.isPremium ? 'Premium Member' : 'Free Member'}
          </span>
        </div>

        <div style={infoBlock}>
          <span style={labelStyle}>Start Date</span>
          <span style={valueStyle}>
            {new Date(subscription.subscriptionStart).toLocaleDateString()}
          </span>
        </div>

        <div style={infoBlock}>
          <span style={labelStyle}>End Date</span>
          <span style={valueStyle}>
            {new Date(subscription.subscriptionEnd).toLocaleDateString()}
          </span>
        </div>

        <div style={statusStyle}>
          {isActive ? (
            <>
              <FiCheckCircle size={20} />
              Active Subscription
            </>
          ) : (
            <>
              <FiXCircle size={20} />
              Expired Subscription
            </>
          )}
        </div>

        <button style={buttonStyle} onClick={() => setShowModal(true)}>
          Cancel Subscription
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalStyle}>
            <h2>⚠️ Are you sure?</h2>
            <p>This action <strong>cannot be reverted</strong>. Your subscription will be cancelled immediately.</p>
            <div>
              <button style={modalButtonStyle} onClick={() => setShowModal(false)}>
                Go Back
              </button>
              <button style={cancelModalButton} onClick={() => {
                setShowModal(false);
                // Perform cancellation logic here
                alert('Subscription cancelled!');
              }}>
                Yes, Cancel It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetail;
