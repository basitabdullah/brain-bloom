import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is BrainBloom?",
      answer: "BrainBloom is an innovative learning platform designed to provide high-quality educational content and courses across various subjects. Our platform connects learners with expert instructors and offers comprehensive learning opportunities to help you develop new skills and knowledge."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the \"Sign Up\" button on the top right corner of the homepage. Enter your email address, create a password, and follow the on-screen instructions to complete the sign-up process."
    },
    {
      question: "How does the monthly subscription work?",
      answer: "The monthly subscription gives you access to our platform's features on a month-to-month basis. You'll be billed once every month for continued access to the courses and other resources available in your plan."
    },
    {
      question: "How can I reset my password?",
      answer: "To reset your password, go to the login page and click on \"Forgot Password.\" Enter your registered email address, and you'll receive a link to reset your password."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can contact our customer support team by clicking on the \"Contact Us\" link in the footer or by visiting our Contact page. We are available 24/7 to assist you."
    },
    {
      question: "What if I encounter a technical issue?",
      answer: "If you encounter any technical issues, try clearing your browser's cache or switching to a different browser. If the problem persists, please contact our technical support team via the \"Contact\" section."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take your privacy and security seriously. We use the latest encryption technologies to protect your data and adhere to strict privacy policies."
    },
    {
      question: "Can I get a refund for a premium subscription?",
      answer: "Our refund policy is outlined in the Terms and Conditions. In general, we offer refunds under certain conditions within a specified period. Please contact us for more details."
    },
    {
      question: "Can I use the platform on mobile devices?",
      answer: "Yes, our platform is fully optimized for both desktop and mobile devices. You can access the platform through your web browser or by downloading our mobile app from the App Store or Google Play."
    }
  ];

  return (
    <div className="faq-page">
      <div className="container">
        <h1 className="faq-page__title">Frequently Asked Questions</h1>
        
        <div className="faq-page__content">
          <div className="faq-page__intro">
            <p>
              Find answers to the most common questions about BrainBloom. 
              If you can't find what you're looking for, feel free to <a href="/contact">contact us</a>.
            </p>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <div 
                  className="faq-item__question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{faq.question}</h3>
                  <span className="faq-item__icon">
                    {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
                <div className={`faq-item__answer ${activeIndex === index ? 'show' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="faq-page__cta">
            <p>Still have questions?</p>
            <a href="/contact" className="btn btn--primary">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 