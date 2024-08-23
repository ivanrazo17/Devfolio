import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; 
import HyperText from '../../../@/components/magicui/hyper-text';

const NavBar: React.FC = () => {
  const [showAbout, setShowAbout] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/about') {
      setShowAbout(true);
    } else if (pathname === '/projects') {
      setShowAbout(false);
    }
  }, [pathname]);

  const handleClick = () => {
    if (showAbout) {
      router.push('/projects');
    } else {
      router.push('/about');
    }
    setShowAbout(!showAbout);
  };

  return (
    <div className="bg-transparent flex flex-col justify-center items-center overflow-visible">
      <div className="sticky top-0 bg-transparent z-50">
        <div 
          onClick={handleClick} 
          className="cursor-pointer flex-col mt-2 px-4 flex justify-center items-center"
        >
          {showAbout ? 
            <div>
              <HyperText
                  className="text-1xl font-bold text-white"
                  text="PROJECTS"
              />
            </div>
              
          :   <HyperText
                  className="text-1xl font-bold text-white"
                  text="ABOUT"
              />}
          <div className="pulsating-bar bg-white w-10 h-0.5 "></div>
        </div>
      </div>

      {/* Add the pulsating bar CSS */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scaleX(1);
            opacity: 1;
          }
          50% {
            transform: scaleX(1.5);
            opacity: 0.5;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        .pulsating-bar {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default NavBar;
