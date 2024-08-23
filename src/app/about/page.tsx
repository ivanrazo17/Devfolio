'use client';

import React from 'react'
import Image from 'next/image';
import NavBar from '../components/NavBar'; 
import Hero from './Hero'
import Experience from './Experience';
import TechStacks from './TechStacks';
import Contact from './Contact';
import Stars from '../components/Stars'
const AboutPage : React.FC= () => {
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
        </div>
  )
}

export default AboutPage;
