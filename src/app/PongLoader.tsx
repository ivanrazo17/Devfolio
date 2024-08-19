// PongLoader.tsx
import React from 'react';
import './globals.css'; // Import the CSS file

const PongLoader: React.FC = () => {
  return (
    <div className="background">
        <div className="pong">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  );
};

export default PongLoader;
