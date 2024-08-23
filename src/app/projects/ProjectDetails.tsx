import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image';
import ProjectList from './ProjectList';
import { Roboto } from 'next/font/google';
import descriptionImg from '/public/description.png';
import techStacksImg from '/public/techstacks.png';
import { ChevronsUp, ChevronsDown } from 'lucide-react';
import Link from 'next/link';

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ["latin"] });

interface ProjectDetailsProps {
  projectNum: number;
  triggerAnimation: boolean;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectNum, triggerAnimation }) => {
  const project = ProjectList.find(p => p.projectNum === projectNum);
  
  // Define spring configurations
  const opacitySpring = useSpring({
    opacity: triggerAnimation ? 0 : 1,
    config: { 
      duration: triggerAnimation ? 0 : 500,
      tension: 200,
      friction: 25,
    },
    delay: triggerAnimation ? 0 : 300,
  });

  const pulseSpring = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.1)' },
    reset: true,
    config: { duration: 1000 },
    loop: { reverse: true }
  });

  // Handle case where project is not found
  if (!project) {
    return <h1 className={`${roboto.className} text-white`}>Project not found</h1>;
  }
  const buttonText = project.status === 'Completed' ? 'View Project' : 'Not Available Yet';
  const buttonColor = project.status === 'Completed' ? '#006F9F' : '#ED6968';
  const textColor = project.status === 'Completed' ? 'cyan' : '#ED6968';

  const combinedSpring = {
    transform: pulseSpring.transform,
    opacity: opacitySpring.opacity,
  };

  return (
    <div className="w-full lg:w-[600px] lg:relative bg-gradient-to-t from-black xl:from-transparent">
      <animated.div
        className={`${roboto.className} p-10 bg-transparent text-white `}
        style={{ opacity: opacitySpring.opacity }}
      >
        <h1 className='text-2xl lg:text-5xl font-extrabold'>{project.projectName}</h1>
        <div className='flex items-center'>
          <span className='lg:text-2xl mt-1' style={{ color: textColor }}>{project.status}</span>
        </div>
        <div className='flex items-center mt-4'>
          <Image src={descriptionImg} alt="Description Icon" width={35} height={35} className='mr-2'/>
          <span className='text-[12px] lg:text-lg font-semibold'>{project.description}</span>
        </div>

        <div className='flex items-center mt-4'>
          <Image src={techStacksImg} alt="Tech Stacks Icon" width={35} height={35} className='mr-2'/>
          <span className='text-[11px] lg:text-lg font-light'>{project.techStacks.join(', ')}</span>
        </div>

        {project.status === 'Completed' ? (
          <Link href={project.href} passHref rel="noopener noreferrer" target="_blank">
            <button
              className='mt-4 px-[110px] py-[15px] lg:py-2 lg:px-4 text-sm lg:text-lg font-semibold rounded shadow-lg'
              style={{
                backgroundColor: buttonColor,
                color: '#fff',
                display: 'inline-block',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 0 10px 10px rgba(88, 136, 165, 1)',
                whiteSpace: 'nowrap'
              }}
            >
              {buttonText}
            </button>
          </Link>
        ) : (
          <button
            className='mt-4 px-[100px] py-[15px] lg:py-2 lg:px-4 text-sm lg:text-lg font-semibold rounded shadow-lg'
            style={{
              backgroundColor: buttonColor,
              color: '#fff',
              cursor: 'not-allowed',
              boxShadow: '0 0 10px 10px rgba(237, 105, 104, 0.5)',
              whiteSpace: 'nowrap'
            }}
          >
            {buttonText}
          </button>
        )}
      </animated.div>
      
      {/* Scroll to Cycle and Arrows */}
      <div className='absolute top-[15%] right-[5%] lg:-left-[100%] lg:top-[25%] flex items-center justify-center'>
        <animated.div style={combinedSpring} className='flex flex-col items-center '>
          <ChevronsUp className='text-white w-[20px]' />
          <div className='lg:hidden text-white text-[12px] my-2' style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Drag to Cycle
          </div>
          <div className='hidden sm:block text-white text-[12px] my-2' style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Scroll to Cycle
          </div>
          <ChevronsDown className='text-white w-[20px]' />
        </animated.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
