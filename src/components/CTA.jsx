import React from 'react';

const CTA = () => {
  return (
    <section id="contact" className="cta section">
      <div className="container">
        <h2 className="cta__title">Ready to Start Your Learning Journey?</h2>
        <p className="cta__subtitle">Join thousands of students who are already transforming their careers with BrainBloom.</p>
        <form className="cta__form">
          <input type="email" placeholder="Enter your email address" required />
          <button type="submit" className="btn btn--cta">Get Started</button>
        </form>
      </div>
    </section>
  );
};

export default CTA;