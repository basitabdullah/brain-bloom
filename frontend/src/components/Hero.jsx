import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">Transform Your Learning Experience</h1>
            <p className="hero__subtitle">
              Discover a new way to learn with our innovative platform that combines cutting-edge technology with expert-led courses.
            </p>
            <div className="hero__buttons">
              <a href="#courses" className="btn btn--primary">Explore Courses</a>
              <a href="#features" className="btn btn--secondary">Learn More</a>
            </div>
          </div>
          <div className="hero__image">
            <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Students learning online" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;