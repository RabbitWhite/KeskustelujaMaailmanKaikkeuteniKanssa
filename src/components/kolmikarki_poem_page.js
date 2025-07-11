import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Poems from "./poems.js";
import BGImage from "./../images/Kolmikarki_Background.png";

// Component to display an individual poem and redirect after a delay
const KolmikarkiPoemPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure routing state to get source and destination poem names
  const { from: fromWhichPoem, new: toWhichPoem } = location.state;

  const poemsData = props.poemsdata;
  const nextPoemPath = "/nextpoem/";
  const readingDelay = 10000; // Delay before navigating to next poem (in ms)

  // Automatically navigate to next poem after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(nextPoemPath, {
        state: { a: toWhichPoem, b: poemsData }
      });
    }, readingDelay);

    // Clean up timer on unmount
    return () => clearTimeout(timer);
  }, [navigate, toWhichPoem, poemsData]);

  return (
    <Fragment>
      {/* Container with background image */}
      <div 
        className="box" 
        style={{ 
          backgroundImage: `url(${BGImage})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          height: "100vh", 
          width: "100%" 
        }}
      >
        {/* Display poem content */}
        <Poems currentPoem={toWhichPoem} poemsdata={poemsData} />
      </div>
    </Fragment>
  );
};

export default KolmikarkiPoemPage;
  

