import { useState, useEffect } from 'react';
import './LandscapeOverlay.css';

function LandscapeOverlay() {
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);

  useEffect(() => {
    const orientationQuery = window.matchMedia('(orientation: landscape)');
    const widthQuery = window.matchMedia('(max-width: 1366px)');

    const checkOrientation = () => {
      setIsLandscapeMobile(orientationQuery.matches && widthQuery.matches);
    };

    checkOrientation();
    orientationQuery.addEventListener('change', checkOrientation);
    widthQuery.addEventListener('change', checkOrientation);

    return () => {
      orientationQuery.removeEventListener('change', checkOrientation);
      widthQuery.removeEventListener('change', checkOrientation);
    };
  }, []);

  if (!isLandscapeMobile) return null;

  return (
    <div className="landscape-overlay">
      <div className="landscape-overlay-content">
        <span className="landscape-overlay-icon">⟳</span>
        <p className="landscape-overlay-text">Käännä laite pystyasentoon</p>
      </div>
    </div>
  );
}

export default LandscapeOverlay;
