import React from 'react';
import { GiBrain } from 'react-icons/gi';
import { FaLightbulb, FaUsers, FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About BrainBloom</h1>
          <p>Transforming education through innovation and accessibility</p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="about-mission__content">
            <h2>Our Mission</h2>
            <p>
              At BrainBloom, we believe that education should be accessible to everyone, 
              everywhere. Our mission is to create a platform where knowledge flows freely, 
              allowing minds to bloom and reach their full potential.
            </p>
            <p>
              Founded in 2020, BrainBloom has grown from a small collection of courses to 
              a comprehensive learning platform serving thousands of students worldwide.
            </p>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="about-values__grid">
            <div className="about-values__item">
              <FaLightbulb className="about-values__icon" />
              <h3>Innovation</h3>
              <p>We constantly explore new teaching methods and technologies.</p>
            </div>
            <div className="about-values__item">
              <FaUsers className="about-values__icon" />
              <h3>Inclusivity</h3>
              <p>We believe education should be accessible to all.</p>
            </div>
            <div className="about-values__item">
              <FaChalkboardTeacher className="about-values__icon" />
              <h3>Excellence</h3>
              <p>We maintain the highest standards in our content and teaching.</p>
            </div>
            <div className="about-values__item">
              <FaGraduationCap className="about-values__icon" />
              <h3>Growth</h3>
              <p>We foster personal and professional development.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="about-story__grid">
            <div className="about-story__image">
              <GiBrain className="brain-icon" />
            </div>
            <div className="about-story__content">
              <h2>Our Story</h2>
              <p>
                BrainBloom started with a simple idea: learning should be engaging, 
                effective, and accessible. Our founder, Sarah Johnson, a former professor, 
                recognized the limitations of traditional education and set out to create 
                something better.
              </p>
              <p>
                Today, we offer hundreds of courses across diverse subjects, taught by 
                industry experts and passionate educators who share our commitment to 
                transformative learning experiences.
              </p>
              <p>
                Our platform combines cutting-edge technology with proven teaching methods 
                to create an environment where students can truly thrive.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <h2 className="about-stats__title">Our Impact</h2>
          <div className="about-stats__grid">
            <div className="about-stats__item">
              <h3>500+</h3>
              <p>Courses</p>
            </div>
            <div className="about-stats__item">
              <h3>50,000+</h3>
              <p>Students</p>
            </div>
            <div className="about-stats__item">
              <h3>200+</h3>
              <p>Instructors</p>
            </div>
            <div className="about-stats__item">
              <h3>98%</h3>
              <p>Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students already learning on BrainBloom</p>
          <a href="#" className="btn btn--primary">Explore Courses</a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 