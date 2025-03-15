import React from "react";
import BlurText from "../../animatedTexts/BlurText";

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <BlurText
              text="Transform Your Learning Experience"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />

           <p className="hero_subtitle">Discover a new way to learn with our innovative platform that combines cutting-edge technology with expert-led courses!</p>
            <div className="hero__buttons">
              <a href="#courses" className="btn btn--primary">
                Explore Courses
              </a>
              <a href="#features" className="btn btn--secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero__image">
            <img
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Students learning online"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
