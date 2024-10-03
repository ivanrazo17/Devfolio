import React from 'react';
import IconCloud from "../../../@/components/magicui/icon-cloud";
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../components/Motion";

const slugs = [
    "cplusplus",
    "php",
    "bootstrap",
    "mysql",
    "googlecolab",
    "tailwindcss",
    "typescript",
    "javascript",
    "python",
    "java",
    "react",
    "html5",
    "css3",
    "nodedotjs",
    "nextdotjs",
    "vercel",
    "git",
    "github",
    "visualstudiocode",
    "androidstudio",
    "figma",
    "threedotjs",
];

const paragraph = {
    languages: ["C++", "Python", "JavaScript", "HTML", "CSS", "PHP", "HDL", "TCL"],
    frameworks: ["Bootstrap", "ReactJS", "Next.js", "Three.js", "Tailwind CSS"],
    tools: ["Figma", "Git", "GitHub", "Synopsys", "Microsoft Office Tools", "MySQL", "Google Colab", "Dev-C++", "Visual Studio Code"],
};

const ColumnList: React.FC<{ items: string[] }> = ({ items }) => {
    // Divide items into columns with a maximum of 6 items per column
    const columns = [];
    for (let i = 0; i < items.length; i += 6) {
        columns.push(items.slice(i, i + 6));
    }

    return (
        <div className="flex flex-wrap gap-4">
            {columns.map((column, index) => (
                <div key={index} className="flex flex-col gap-2">
                    {column.map((item, idx) => (
                        <span key={idx} className="text-base text-secondary">
                            {item}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
};

const TechStacks: React.FC = () => {
  return (
    <> 
        <motion.div variants={textVariant(0)}>
            <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">What I Learned So Far.</p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Tech Stacks</h2>
            <div 
                className="relative flex h-full w-full max-w-[100rem] items-center justify-center overflow-hidden px-20 pb-[120px] pt-8" 
                style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 10%, rgba(169, 169, 169, 0) 50%)' }}>
                <IconCloud iconSlugs={slugs} />
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
            <div>
                <motion.p
                    variants={fadeIn("up", "spring", 0.1, 1)}
                    className="font-semibold text-xl text-secondary"
                >
                    Languages:
                </motion.p>
                <ColumnList items={paragraph.languages} />
            </div>
            <div>
                <motion.p
                    variants={fadeIn("up", "spring", 0.1, 1)}
                    className="font-semibold text-xl text-secondary"
                >
                    Frameworks/Libraries:
                </motion.p>
                <ColumnList items={paragraph.frameworks} />
            </div>
            <div>
                <motion.p
                    variants={fadeIn("up", "spring", 0.1, 1)}
                    className="font-semibold text-xl text-secondary"
                >
                    Developer Tools:
                </motion.p>
                <ColumnList items={paragraph.tools} />
            </div>
        </div>

    </>
  )
}

export default SectionWrapper(TechStacks, "TechStacks");
