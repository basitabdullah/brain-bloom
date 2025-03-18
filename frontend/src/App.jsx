import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import SubscriptionModal from "./components/SubscriptionModal";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import "./styles/main.scss";
import TearmsAndServices from "./components/TearmsAndServices";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";

function App() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const { user } = useUserStore();

  const handleSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
    setIsSubscriptionOpen(false);
  };

  const handleLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
    setIsSubscriptionOpen(false);
  };

  const handleSubscription = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false);
    setIsSubscriptionOpen(true);
  };

  return (
    <Router>
      <div className="app">
        <Header
          onSignupClick={handleSignup}
          onLoginClick={handleLogin}
          onSubscriptionClick={handleSubscription}
        />

        <main>
          <ScrollToTop>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/terms" element={<TearmsAndServices />} />
              <Route
                path="/watch/:courseId"
                element={
                  (user && user?.role === "subscriber") ||
                  user?.role === "admin" ? (
                    <VideoPlayerPage />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ScrollToTop>
        </main>

        <Footer />

        <SignupModal
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
          onLoginClick={handleLogin}
        />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSignupClick={handleSignup}
        />
        <SubscriptionModal
          isOpen={isSubscriptionOpen}
          onClose={() => setIsSubscriptionOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
