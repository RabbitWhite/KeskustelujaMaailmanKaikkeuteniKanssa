import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Poems from "./poems.js";
import BGImage from "./../images/Kolmikarki_Background.png";
import { usePoemsData } from "../context/PoemsContext";

// Unified component to display a poem and redirect after a delay
// isRerun: if true, displays the "from" poem (re-reading), otherwise displays the "new" poem
const KolmikarkiPoemPage = ({ isRerun = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const poemsData = usePoemsData();

  const nextPoemPath = "/nextpoem/";
  const readingDelay = 15000; // Delay before navigating to next poem (in ms)

  // Select which poem to display based on mode
  const currentPoem = isRerun ? location.state?.from : location.state?.new;

  // Redirect to home if accessed directly without state, or navigate after delay
  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      navigate(nextPoemPath, {
        state: { currentPoem }
      });
    }, readingDelay);

    // Clean up timer on unmount
    return () => clearTimeout(timer);
  }, [navigate, location.state, currentPoem]);

  // Don't render if no state (redirect will happen in useEffect)
  if (!location.state) {
    return null;
  }

  return (
    <Fragment>
      <div
        className="box poem-page-background"
        style={{ backgroundImage: `url(${BGImage})` }}
      >
        <Poems currentPoem={currentPoem} poemsdata={poemsData} />
      </div>
    </Fragment>
  );
};

export default KolmikarkiPoemPage;
