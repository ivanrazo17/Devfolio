import { VerticalTimeline, VerticalTimelineElement  } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import { motion } from "framer-motion";
import { experiences } from "./aboutDetails";
import { textVariant } from "../components/Motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

interface ExperienceCardProps {
    index: number;
    title: string;
    companyName: string;
    icon: string;
    iconBg: string;
    date: string;
    points: string[];
  }


const ExperienceCard: React.FC<ExperienceCardProps & { position: "left" | "right" }> = ({ title, companyName, icon, iconBg, date, points, position }) => {
    const { ref, inView } = useInView({ threshold: 0 });

    return (
        <div ref={ref}>
            <VerticalTimelineElement
                visible={inView}
                contentStyle={{ background: '#1d1836', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid #232631' }}
                date={date}
                iconStyle={{ background: iconBg }}
                icon={
                    <div className="flex justify-center items-center w-full h-full">
                        <Image
                            src={icon}
                            alt={companyName}
                            width={35}
                            height={35}
                            className="object-contain"
                        />
                    </div>
                }
                position={position}
            >
                <div>
                    <h3 className="text-white text-[24px] font-bold">{title}</h3>
                    <p className="text-secondary text-[16px] font-semibold m-0">{companyName}</p>
                </div>

                <ul className="mt-5 list-disc ml-5 space-y-2">
                    {points.map((point, index) => (
                        <li
                            key={`experience.points.${index}`}
                            className="text-white-100 text-[14px] pl-1 tracking-wider"
                        >
                            {point}
                        </li>
                    ))}
                </ul>
            </VerticalTimelineElement>
        </div>
    );
};


const Experience: React.FC = () => {
    return (
        <>
            <motion.div variants={textVariant(0)}>
                <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">The milestones I reached in my journey.</p>
                <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Work Experiences</h2>
            </motion.div>
            <div className="mt-20 flex flex-col">
                <VerticalTimeline>
                    {experiences.map((experience, index) => (
                        <ExperienceCard
                            key={experience.title + index}
                            index={index}
                            position={index % 2 === 0 ? "left" : "right"}
                            {...experience}
                        />
                    ))}
                </VerticalTimeline>
            </div>
        </>
    );
};

export default SectionWrapper(Experience, "work");
