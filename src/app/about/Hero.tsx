import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../components/Motion";
import { contact } from "./aboutDetails"; // Import updated contact details
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import { MapPinHouse } from "lucide-react";

const About: React.FC = () => {
  const [emailText, setEmailText] = useState("Connect with me");

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setEmailText("Email copied");
    setTimeout(() => {
      setEmailText("Connect with me");
    }, 1500);
  };

  return (
    <>
      <motion.div
        variants={textVariant(0)}
        className="w-full h-screen flex items-center justify-center mt-[-40px]"
      >
        {/* Adjust flex direction based on screen size */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-10">
          {/* Container for the image with gradient border */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-[4px] bg-gradient-to-b from-[#099AB0] to-[#B656E3]">
            {/* Smaller image inside the gradient border */}
            <div className="relative w-full h-full rounded-full bg-[#17102F]">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/profile.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Banner"
                  priority={true}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="text-center md:text-left">
            <h2 className="text-white font-black md:text-[50px] sm:text-[40px] text-[36px] leading-tight">
              Hi, I’m <span className="text-[#915EFF]">Ivan</span>
            </h2>
            <motion.p
              variants={fadeIn("up", "spring", 0.1, 1)}
              className="text-secondary text-lg sm:text-xl max-w-2xl leading-7"
            >
              An Aspiring{" "}
              <span className="text-[#915EFF]">Web Developer</span>,{" "}
              <span className="text-[#39daf3]">UI/UX Designer</span>,{" "}
              <span className="text-[#f7da3a]">Data Analyst</span>.
            </motion.p>

            <div className="mt-2 flex justify-center md:justify-start items-center space-x-2 text-white">
              <MapPinHouse />
              <p>Metro Manila, Philippines</p>
            </div>

            {/* Contact Section */}
            <div className="mt-5 flex flex-row justify-center md:justify-start space-x-6">
              <button
                className="flex flex-col items-center bg-gradient-to-b from-[#099AB0] to-[#B656E3] p-[1px] rounded-[20px] transition-all duration-300 hover:scale-110"
                onClick={() => copyEmail("ivanrazo745@gmail.com")}
              >
                <div className="bg-[#17102F] rounded-[20px] px-3 h-10 flex flex-col justify-center items-center whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="animate-pulse bg-green-500 rounded-full h-2 w-2" />
                    <span className="text-white text-md font-bold text-center mx-2">
                      {emailText}
                    </span>
                  </div>
                </div>
              </button>

              {contact.map((item, index) => (
                <div
                  key={item.title + index}
                  className="flex flex-col items-center mx-2"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        width={35}
                        height={35}
                        className="transition-transform duration-300 hover:scale-110 invert"
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full">
                        No Icon
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");
