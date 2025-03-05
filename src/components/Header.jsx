import React, { useState, useEffect } from 'react';
import { FaBars, FaCrown } from 'react-icons/fa';
import { GiBrain } from "react-icons/gi";

const Header = ({ onSignupClick, onLoginClick, onPageChange, onSubscriptionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscriptionClick = () => {
    // Add subscription handling logic here
    alert('Subscription options coming soon!');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#" className="header__logo" onClick={() => onPageChange('home')}>
          <GiBrain size={32} className="header__logo-icon" />
          <span>BrainBloom</span>
        </a>
        
        <button 
          className="header__mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars size={24} />
        </button>
        
        <nav className={`header__nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="header__menu">
            <li className="header__menu-item">
              <a href="#" onClick={() => onPageChange('courses')}>Courses</a>
            </li>
          </ul>
          <div className="header__cta">
            <a href="#" className="btn btn--primary" onClick={onSignupClick}>Sign Up</a>
            <a href="#" className="btn btn--secondary subscription-btn" onClick={onSubscriptionClick}>
              <FaCrown size={14} /> Subscribe
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;