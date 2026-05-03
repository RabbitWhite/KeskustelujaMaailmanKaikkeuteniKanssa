import { Fragment } from "react";
import { Link } from "react-router-dom";

import { usePoemsData } from "../context/PoemsContext";

export default function ContentsPage() {
  const poemsData = usePoemsData();

  return (
    <Fragment>
      <div className="box contents-page-background">
        <div className="contents-container">
          <div className="poemtext contents-title">Sisällysluettelo</div>
          <ul className="contents-list">
            {poemsData.map((poem, index) => (
              <li key={poem.id} className="contents-list-item">
                <Link
                  to="/poem/"
                  className="poemlink contents-link"
                  state={{ from: poem.name, new: poem.name }}
                >
                  {index + 1}. {poem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
