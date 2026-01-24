import { Fragment, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { usePoemsData } from "../context/PoemsContext";

// Utility: Get random integer between min and max (inclusive)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Find kin poems by name and return array of numeric IDs
function fetchKinPoems(currentPoemName, poemsdata) {
  if (!poemsdata || poemsdata.length === 0) return [1, 2];
  const index = poemsdata.findIndex(item => item.name === currentPoemName);
  return index !== -1 ? poemsdata[index].kinpoems.map(Number) : poemsdata[0].kinpoems.map(Number);
}

// Find poem ID by name
function fetchThePoem(currentPoemName, poemsdata) {
  if (!poemsdata || poemsdata.length === 0) return 0;
  const index = poemsdata.findIndex(item => item.name === currentPoemName);
  return index !== -1 ? poemsdata[index].id : 0;
}

export default function KolmikarkiNextPoem() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const poemsData = usePoemsData();

  // Redirect to home if accessed directly without state
  useEffect(() => {
    if (!state || !state.currentPoem) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  // Don't render if no state (redirect will happen in useEffect)
  if (!state || !state.currentPoem) {
    return null;
  }

  const currentPoemName = state.currentPoem;

  // Get kin poems and randomly choose one
  const kinPoems = fetchKinPoems(currentPoemName, poemsData);
  const randomIndex = getRandom(0, kinPoems.length - 1);

  const selectedKinPoemId = kinPoems[randomIndex];
  const selectedKinPoem = poemsData.filter(item => item.id === String(selectedKinPoemId));

  // Get current, previous, and next poems
  const currentPoemId = fetchThePoem(currentPoemName, poemsData);
  const currentPoemIdNum = parseInt(currentPoemId, 10);
  const prevPoemNum = currentPoemIdNum - 1;
  const nextPoemNum = currentPoemIdNum + 1;
  const currentPoem = poemsData.filter(item => item.id === String(currentPoemId));
  const prevPoem = poemsData.filter(item => item.id === String(prevPoemNum));
  const nextPoem = poemsData.filter(item => item.id === String(nextPoemNum));

  return (
    <Fragment>
      <div className="box fixed img nextpoem-background">
        {/* Reread current poem */}
        {currentPoem.length > 0 && (
          <Link
            to="/poemrerun/"
            className="fixed poemlink reread-link"
            state={{ from: currentPoemName, new: currentPoem[0].name }}
          >
            <div className="poemlink">Lue "{currentPoem[0].name}" uudelleen</div>
          </Link>
        )}

        {/* Random kin poem */}
        {selectedKinPoem.length > 0 && (
          <Link
            to="/poem/"
            className="fixed poemlink kinpoem-link"
            state={{ from: currentPoem[0].name, new: selectedKinPoem[0].name }}
          >
            <div className="poemlink">Sattuman saattelema sisarruno: {selectedKinPoem[0].name}</div>
          </Link>
        )}

        {/* Previous poem */}
        {prevPoem.length > 0 && (
          <Link
            to="/poem/"
            className="fixed poemlink prevpoem-link"
            state={{ from: currentPoem[0].name, new: prevPoem[0].name }}
          >
            <div className="poemlink">Edellinen</div>
          </Link>
        )}

        {/* Next poem */}
        {nextPoem.length > 0 && (
          <Link
            to="/poem/"
            className="fixed poemlink nextpoem-link"
            state={{ from: currentPoem[0].name, new: nextPoem[0].name }}
          >
            <div className="poemlink">Seuraava</div>
          </Link>
        )}
      </div>
    </Fragment>
  );
}
