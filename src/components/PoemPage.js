import { Fragment, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Poems from "./poems.js";
import BGImage from "./../images/PageBackground.webp";
import { usePoemsData } from "../context/PoemsContext";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchKinPoems(currentPoemName, poemsdata) {
  if (!poemsdata || poemsdata.length === 0) return [];
  const index = poemsdata.findIndex(item => item.name === currentPoemName);
  return index !== -1 ? poemsdata[index].kinpoems.map(Number) : [];
}

function fetchThePoem(currentPoemName, poemsdata) {
  if (!poemsdata || poemsdata.length === 0) return 0;
  const index = poemsdata.findIndex(item => item.name === currentPoemName);
  return index !== -1 ? poemsdata[index].id : 0;
}

// Unified component to display a poem
// isRerun: if true, displays the "from" poem (re-reading), otherwise displays the "new" poem
const PoemPage = ({ isRerun = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const poemsData = usePoemsData();
  const hasLocationState = Boolean(location.state);

  // Select which poem to display based on mode
  const currentPoem = isRerun ? location.state?.from : location.state?.new;

  // Redirect to home if accessed directly without state
  useEffect(() => {
    if (!hasLocationState) {
      navigate("/", { replace: true });
    }
  }, [navigate, hasLocationState]);

  const currentPoemId = fetchThePoem(currentPoem, poemsData);
  const currentPoemIdNum = parseInt(currentPoemId, 10);
  const prevPoemNum = currentPoemIdNum - 1;
  const nextPoemNum = currentPoemIdNum + 1;

  const currentPoemItem = poemsData.filter(item => item.id === String(currentPoemId));
  const prevPoem = poemsData.filter(item => item.id === String(prevPoemNum));
  const nextPoem = poemsData.filter(item => item.id === String(nextPoemNum));

  const randomKinPoem = useMemo(() => {
    const kinPoems = fetchKinPoems(currentPoem, poemsData);
    const validKinPoems = kinPoems
      .map(id => poemsData.find(item => item.id === String(id)))
      .filter(Boolean);

    if (validKinPoems.length === 0) {
      return null;
    }

    const randomIndex = getRandom(0, validKinPoems.length - 1);
    return validKinPoems[randomIndex];
  }, [currentPoem, poemsData]);

  // Don't render if no state (redirect will happen in useEffect)
  if (!hasLocationState) {
    return null;
  }

  return (
    <Fragment>
      <div
        className="box poem-page-background"
        style={{ backgroundImage: `url(${BGImage})` }}
      >
        {currentPoemItem.length > 0 && (
          <Link
            to="/contents/"
            className="fixed poemlink contents-link-top-left"
            state={{ currentPoem: currentPoemItem[0].name }}
          >
            Sisällysluettelo
          </Link>
        )}

        <Poems currentPoem={currentPoem} poemsdata={poemsData} />

        {randomKinPoem && currentPoemItem.length > 0 && (
          <Link
            to="/poem/"
            className="fixed poemlink kinpoem-link"
            state={{ from: currentPoemItem[0].name, new: randomKinPoem.name }}
          >
            <div className="poemlink">Sisarruno</div>
          </Link>
        )}

        {prevPoem.length > 0 && currentPoemItem.length > 0 && (
          <Link
            to="/poem/"
            className="fixed poemlink prevpoem-link"
            state={{ from: currentPoemItem[0].name, new: prevPoem[0].name }}
          >
            <div className="poemlink">Edellinen</div>
          </Link>
        )}

        {nextPoem.length > 0 && currentPoemItem.length > 0 && (
          <Link
            to="/poem/"
            className="fixed poemlink nextpoem-link"
            state={{ from: currentPoemItem[0].name, new: nextPoem[0].name }}
          >
            <div className="poemlink">Seuraava</div>
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default PoemPage;
