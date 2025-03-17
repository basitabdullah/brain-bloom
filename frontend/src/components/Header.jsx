import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import ShinyText from "../../animatedTexts/ShinyText/ShinyText";
import { useUserStore } from "../stores/useUserStore";

const Header = ({ onSignupClick, onSubscriptionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { checkAuth, logout, user } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header__logo">
          <Link to="/" className="logo">
            <GiBrain size={32} />
            <span>BrainBloom</span>
          </Link>
        </div>

        <nav className={`header__nav ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="header__cta">
          {user ? (
            <button onClick={() => logout()} className="btn btn--primary">
              Logout
            </button>
          ) : (
            <a
              href="#"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                onSignupClick();
              }}
            >
              Sign Up
            </a>
          )}
          <a
            href="#"
            className="btn btn--secondary subscription-btn"
            onClick={(e) => {
              e.preventDefault();
              onSubscriptionClick();
            }}
          >
            <ShinyText
              text={<FaCrown size={14} />}
              disabled={false}
              speed={3}
              className="custom-class"
            />
            <ShinyText
              text="Subscribe"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </a>
        </div>

        <button
          className={`header__mobile-toggle ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
