import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Disable body scroll when loading
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const duration = 1800; // 1.8 seconds starting screen display

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onFinished();
      }, 850); // Allow slide-up animation out
    }, duration);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className={`loading-screen ${isExiting ? 'exit' : ''}`}>
      <div className="loading-content">
        {/* Logo Container */}
        <div className="loading-logo-container">
          <img 
            src="/logo.png" 
            alt="Essay Pressings Logo" 
            className="loading-logo"
            onError={(e) => {
              // fallback if logo fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};
