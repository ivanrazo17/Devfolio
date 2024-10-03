'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import Hero from './Hero';
import Experience from './Experience';
import TechStacks from './TechStacks';
import Contact from './Contact';
import Stars from '../components/Stars';
import { ChevronsUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  // Handle scroll position to show or hide the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll back to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative bg-[#050815]">
      <Stars />

      {/* NavBar */}
      <div className="fixed top-0 left-0 right-0 z-[6]">
        <NavBar />
      </div>

      {/* Background Image */}
      <div className="absolute z-0 w-screen h-screen">
        <Image
          src="/herobg.png"
          alt="hero"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>

      {/* Hero Section */}
      <div className="z-[4]">
        <Hero />
      </div>

      {/* Experience Section */}
      <div className="z-[4]">
        <Experience />
      </div>

      {/* TechStacks Section */}
      <div className="z-[4]">
        <TechStacks />
      </div>

      {/* Contact Section */}
      <div className="z-[4]">
        <Contact />
      </div>

      {/* Back to Top Button */}
      {showButton && (
        <button
          className="fixed bottom-8 right-8 z-[10] bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          onClick={scrollToTop}
        >
          <ChevronsUp />
        </button>
      )}
    </div>
  );
};

export default AboutPage;
