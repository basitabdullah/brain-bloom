import React from 'react';
import { GiBrain } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <h3 className="footer__logo">
              <GiBrain size={30} className="footer__logo-icon" />
              <span>BrainBloom</span>
            </h3>
            <p>We're dedicated to providing high-quality education that's accessible to everyone. Our mission is to empower learners worldwide to achieve their goals through knowledge.</p>
            <div className="footer__about-social">
              <a href="#" aria-label="Facebook">F</a>
              <a href="#" aria-label="Twitter">T</a>
              <a href="#" aria-label="Instagram">I</a>
              <a href="#" aria-label="LinkedIn">L</a>
            </div>
          </div>
          
          <div className="footer__nav">
            <h4>Explore</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </div>
          
          <div className="footer__nav">
            <h4>Information</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer__nav">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__bottom-copyright">
            &copy; {new Date().getFullYear()} BrainBloom. All rights reserved.
          </div>
          <div className="footer__bottom-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;