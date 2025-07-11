import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import BGImage from "./../images/Kolmikarki_Background.png";

// Utility: Get random integer between min and max (inclusive)
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

// Find kin poems by name and return array of numeric IDs
function fetchKinPoems(currentPoemName, poemsdata) {
  if (!poemsdata) return [1, 2];
  const index = poemsdata.findIndex(item => item.name === currentPoemName);
  return index !== -1 ? poemsdata[index].kinpoems.map(Number) : poemsdata[0].kinpoems.map(Number);
}

// Find poem ID by name
function fetchThePoem(currentPoemName, poemsdata) {
  if (!poemsdata) return 0;
  const index = poemsdata.findIndex(item => item.name === currentPoemName);
  return index !== -1 ? poemsdata[index].id : 0;
}

export default function KolmikarkiNextPoem(props) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const poemsData = state?.b || [];
  const currentPoemName = state?.a || "";

  // Get kin poems and randomly choose one
  const kinPoems = fetchKinPoems(currentPoemName, poemsData);
  const randomIndex = getRandom(0, kinPoems.length - 1);

  const selectedKinPoemId = kinPoems[randomIndex];
  const selectedKinPoem = poemsData.filter(item => item.id === JSON.stringify(selectedKinPoemId));
  //console.log("kinPoems[randomIndex]: " +  JSON.stringify(kinPoems[randomIndex]));
  //console.log("selectedKinPoemId: " +  JSON.stringify(selectedKinPoemId));
  //console.log("selectedKinPoem: " +  JSON.stringify(selectedKinPoem));

  // Get current, previous, and next poems
  const currentPoemId = fetchThePoem(currentPoemName, poemsData);
  const currentPoemIdNum = parseInt(fetchThePoem(currentPoemName, poemsData), 10);
  const prevPoemNum = currentPoemIdNum - 1;
  const nextPoemNum = currentPoemIdNum + 1;
  const currentPoem = poemsData.filter(item => item.id === currentPoemId);
  const prevPoem = poemsData.filter(item => item.id === String(prevPoemNum));
  const nextPoem = poemsData.filter(item => item.id === String(nextPoemNum));
  console.log("currentPoemId: " +  JSON.stringify(currentPoemId));
  console.log("PrevPoemId: " +  JSON.stringify(String(prevPoemNum)));
  console.log("nextPoemId: " +  JSON.stringify(String(nextPoemNum)));
  console.log("currentPoem: " +  JSON.stringify(currentPoem));
  console.log("PrevPoem: " +  JSON.stringify(prevPoem));
  console.log("nextPoem: " +  JSON.stringify(nextPoem));

 

  const [count, setCount] = useState(1);

  useEffect(() => {
    // Reserved for potential future use (e.g., side effects or navigation delay)
  }, []);

  return (
    <Fragment>
      <div
        className="box fixed img"
        style={{
          backgroundImage: `url(${BGImage})`,
          backgroundSize: "cover",
          top: "0%",
          left: "0%",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Reread current poem */}
        {currentPoem.length > 0 && (
          <Link
            to="/poemrerun/"
            className="fixed"
            state={{ from: currentPoemName, new: currentPoem[0].name }}
            style={{ top: "15%", left: "30%", width: "40%", height: "10%" }}
          >
            <div className="poemlink">Lue "{currentPoem[0].name}" uudelleen</div>
          </Link>
        )}

        {/* Random kin poem */}
        {selectedKinPoem.length > 0 && (
          <Link
            to="/poem/"
            className="fixed"
            state={{ from: currentPoem[0].name, new: selectedKinPoem[0].name }}
            style={{ top: "60%", left: "30%", width: "40%", height: "10%" }}
          >
            <div className="poemlink">Sattuman saattelema sisarruno: {selectedKinPoem[0].name}</div>
          </Link>
        )}

        {/* Previous poem */}
        {prevPoem.length > 0 && (
          <Link
            to="/poem/"
            className="fixed"
            state={{ from: currentPoem[0].name, new: prevPoem[0].name }}
            style={{ top: "80%", left: "20%", width: "30%", height: "10%" }}
          >
            <div className="poemlink">Edellinen</div>
          </Link>
        )}

        {/* Next poem */}
        {nextPoem.length > 0 && (
          <Link
            to="/poem/"
            className="fixed"
            state={{ from: currentPoem[0].name, new: nextPoem[0].name }}
            style={{ top: "80%", left: "50%", width: "30%", height: "10%" }}
          >
            <div className="poemlink">Seuraava</div>
          </Link>
        )}
      </div>
    </Fragment>
  );
}
