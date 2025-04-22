import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import ShinyText from "../../animatedTexts/ShinyText/ShinyText";
import { useUserStore } from "../stores/useUserStore";
import { FaUser, FaCog } from "react-icons/fa";
const Header = ({ onSignupClick, onSubscriptionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { checkAuth, logout, user } = useUserStore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)}>
                Courses
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
            {user?.role === "admin" && (
              <li>
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                  Admin
                </Link>
              </li>
            )}

            {/* Mobile-only auth button */}
            {!user && (
              <li className="mobile-auth-link">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    onSignupClick();
                  }}
                >
                  Sign Up / Login
                </a>
              </li>
            )}
            {user && (
              <>
                <li className="mobile-auth-link">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </a>
                </li>
                {user.role === "user" && (
                  <li className="mobile-auth-link">
                    <a
                      href="#"
                      id="subscription-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        onSubscriptionClick();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <ShinyText
                        text={<FaCrown size={20} />}
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
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>

        <div className="header__cta">
          {user ? (
            <a onClick={() => logout()} className="btn btn--primary">
              Logout
            </a>
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
          {user && user.role === "user" && (
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
          )}

          {user && (
            <button
              className="user-profile"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              {user.name.split(" ")[0].charAt(0)}
            </button>
          )}
          {user && isProfileMenuOpen && (
            <div className="user-menu">
              <div className="user-info">
                <div className="avatar">
                  {user.name.split(" ")[0].charAt(0)}
                  {user.name.split(" ")[1]
                    ? user.name.split(" ")[1].charAt(0)
                    : ""}
                </div>
                <div className="details">
                  <p className="name">{user.name}</p>
                  <p className="email">{user.email}</p>
                </div>
              </div>
              <span className="membership">
                {user.role === "subscriber" ? "Premium Member" : user.role}
              </span>
              <ul className="menu-list">
                <Link to={"/profile"} style={{
                  textDecoration : "none"
                }} className="menu-item">
                  <FaUser className="icon" /> Profile
                </Link>
                <Link to="/subscription-detail" className="menu-item" style={{
                  textDecoration : "none"
                }}>
                  <FaCog className="icon" /> Subscription
                </Link>
              </ul>
            </div>
          )}
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
