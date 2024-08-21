import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image';
import ProjectList from './ProjectList';
import { Roboto } from 'next/font/google';
import descriptionImg from '/public/description.png';
import techStacksImg from '/public/techstacks.png';
import { ChevronsUp, ChevronsDown } from 'lucide-react';

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ["latin"] });

interface ProjectDetailsProps {
  projectNum: number;
  triggerAnimation: boolean;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectNum, triggerAnimation }) => {
  const project = ProjectList.find(p => p.projectNum === projectNum);

  if (!project) {
    return <h1 className={`${roboto.className} text-white`}>Project not found</h1>;
  }

  // Set up the spring animation
  const { opacity } = useSpring({
    opacity: triggerAnimation ? 0 : 1,
    config: { 
      duration: triggerAnimation ? -1 : 500, // 100ms for disappearing, 500ms for appearing
      tension: 200,
      friction: 25,
    },
    delay: triggerAnimation ? 0 : 300, // Delay only for appearing
  });

  const buttonText = project.status === 'Completed' ? 'View Project' : 'Not Available Yet';
  const buttonColor = project.status === 'Completed' ? '#006F9F' : '#ED6968';
  const textColor = project.status === 'Completed' ? '#006F9F' : '#ED6968';

  // Pulsing animation for up arrow
  const pulseSpring = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.1)' },
    reset: true,
    config: { duration: 1000 },
    loop: { reverse: true }
  });

  const combinedSpring = {
    transform: pulseSpring.transform,
    opacity,
  };

  return (
    <div className='relative'>
      <animated.div
        className={`${roboto.className} p-10 bg-transparent text-white w-[450px]`}
        style={{ opacity }}
      >
        {/* Add the content here */}
        <h1 className='text-5xl font-extrabold'>{project.projectName}</h1>
        <div className='flex items-center'>
          <span className='text-xl mt-1' style={{ color: textColor }}>{project.status}</span>
        </div>
        <div className='flex items-center mt-4'>
          <Image src={descriptionImg} alt="Description Icon" width={24} height={24} className='mr-2'/>
          <span className='text-lg font-semibold'>{project.description}</span>
        </div>
        <div className='flex items-center mt-4'>
          <Image src={techStacksImg} alt="Tech Stacks Icon" width={24} height={24} className='mr-2'/>
          <span className='text-sm font-light'>{project.techStacks.join(', ')}</span>
        </div>
        {project.status === 'Completed' ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className='mt-4 py-2 px-4 text-lg font-semibold rounded'
            style={{
              backgroundColor: buttonColor,
              color: '#fff',
              display: 'inline-block',
              textAlign: 'center',
              textDecoration: 'none'
            }}
          >
            {buttonText}
          </a>
        ) : (
          <button
            className='mt-4 py-2 px-4 text-lg font-semibold rounded'
            style={{
              backgroundColor: buttonColor,
              color: '#fff',
              cursor: 'not-allowed'
            }}
            disabled
          >
            {buttonText}
          </button>
        )}
      </animated.div>
      
      {/* Scroll to Cycle and Arrows */}
      <div className='absolute left-[-20px] top-[25%] flex items-center justify-center'>
        <animated.div style={combinedSpring} className='flex flex-col items-center '>
          <ChevronsUp className='w-[20px]' />
          <div className='text-white text-[12px] my-5' style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Scroll to Cycle
          </div>
          <ChevronsDown className='w-[20px]' />
        </animated.div>
      </div>


    </div>
  );
};

export default ProjectDetails;
