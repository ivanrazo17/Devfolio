import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../components/Motion";
import { hobbies } from "./aboutDetails";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper"; // Adjust the path as needed

// Define types for HobbiesCard props
interface HobbiesCardProps {
  index: number;
  title: string;
  icon: string;
}

// HobbiesCard component to display individual hobbies
const HobbiesCard: React.FC<HobbiesCardProps> = ({ index, title, icon }) => {
    return (
      <Tilt className="lg:w-[250px] w-full">
        <motion.div
          variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
          className="w-full bg-gradient-to-b from-[#099AB0] to-[#B656E3] p-[1px] rounded-[20px] shadow-lg"
          style={{
            boxShadow: '0 0 5px 5px rgba(124, 115, 156, 0.2)',
          }}
        >
          <div className="bg-[#17102F] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
            <Image
              src={icon}
              alt={title}
              width={100}
              height={100}
              className="object-contain"
              aria-label={`Icon representing ${title}`}
            />
            <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
          </div>
        </motion.div>
      </Tilt>
    );
};

const About: React.FC = () => {
    return (
      <>
        <motion.div variants={textVariant(0)}>
          <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider mt-2">Get to Know Me.</p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] lg:leading-[98px]">
            Hi, I’m <span className="text-[#915EFF]">Ivan</span>
          </h2>
        </motion.div>
  
        <motion.p
          variants={fadeIn("up", "spring", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          An Aspiring Web Developer based in the Philippines. I am also pushing the boundaries of technology as
          an AI Researcher. Apart from that, I am also a Cosplay Artisan and a Video Game Collector,
          combining creativity with a love for rare collections.
        </motion.p>
  
        <div className="mt-20 flex flex-wrap gap-10">
          {hobbies.map((hobby, index) => (
            <HobbiesCard key={hobby.title + index} index={index} {...hobby} />
          ))}
        </div>
      </>
    );
};

export default SectionWrapper(About, "about");
