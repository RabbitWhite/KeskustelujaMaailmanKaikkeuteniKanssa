import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css';

import BGImage from "./../images/Kolmikarki_Background.png";

// Front page component for the Kolmikarki poetry app
export default function KolmikarkiFrontPage(props) {
    return (
        <Fragment>
            {/* Full-page container with background image */}
            <div className="box fixed img frontpage-background">
                <h1 className="title fixed frontpage-title">Kolmipiikki</h1>
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

