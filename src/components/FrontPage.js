import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css';

import BGImage from "./../images/PageBackground.webp";

// Front page component for the poetry app
export default function FrontPage(props) {
    return (
        <Fragment>
            {/* Full-page container with background image */}
            <div className="box fixed img frontpage-background">
                <h1 className="title fixed frontpage-title">Keskusteluja Maailmani Kaikkeuden Kanssa</h1>
                <div className="fixed start-button-container">
                    <Link
                    to="/poem/"
                    state={{ from: 1, new: 'Polttoväli' }}
                    className="poemlink"
                    >
                    Aloita
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}

