import { Fragment } from "react";
import { Link } from "react-router-dom";

import BGImage from "./../images/Kolmikarki_Background.webp";
import { usePoemsData } from "../context/PoemsContext";

export default function KolmikarkiContentsPage() {
  const poemsData = usePoemsData();

  return (
    <Fragment>
      <div
        className="box contents-page-background"
        style={{ backgroundImage: `url(${BGImage})` }}
      >
        <div className="contents-container">
          <div className="poemtext contents-title">Sisällysluettelo</div>
          <ul className="contents-list">
            {poemsData.map((poem) => (
              <li key={poem.id} className="contents-list-item">
                <Link
                  to="/poem/"
                  className="poemlink contents-link"
                  state={{ from: poem.name, new: poem.name }}
                >
                  {poem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
