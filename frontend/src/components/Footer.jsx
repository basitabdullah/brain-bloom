import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { GiBrain } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="logo">
              <GiBrain size={32} />
              <span>BrainBloom</span>
            </Link>
            <p>Transform your learning experience with our innovative platform.</p>
            <div className="footer__social">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
          
          <div className="footer__links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer__links">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Support</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div className="footer__contact">
            <h3>Contact Us</h3>
            <p>Email: info@brainbloom.com</p>
            <p>Address: India</p>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} BrainBloom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;