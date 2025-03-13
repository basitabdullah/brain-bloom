import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Courses from '../components/Courses';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import ScrollToTop from '../components/ScrollToTop';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Courses />
      <Testimonials />
      <CTA />
    </>
  );
};

export default HomePage; 