import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';
import SubscriptionModal from './components/SubscriptionModal';
import CoursesPage from './pages/CoursesPage';
import './styles/main.scss';

function App() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Timer to show subscription modal after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSubscriptionOpen(true);
    }, 10000); // 10 seconds
    
    return () => clearTimeout(timer);
  }, []);

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
    <div className="app">
      <Header 
        onSignupClick={handleSignup} 
        onLoginClick={handleLogin}
        onSubscriptionClick={handleSubscription}
        onPageChange={setCurrentPage} 
      />
      {currentPage === 'home' ? (
        <main>
          <Hero />
          <Features />
          <Courses />
          <Testimonials />
          <CTA />
        </main>
      ) : (
        <main>
          <CoursesPage />
        </main>
      )}
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
  );
}

export default App;