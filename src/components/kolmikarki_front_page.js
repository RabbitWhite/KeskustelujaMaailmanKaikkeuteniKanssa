import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css';

import BGImage from "./../images/Kolmikarki_Background.png";

// Front page component for the Kolmikarki poetry app
export default function KolmikarkiFrontPage(props) {
    return (
        <Fragment>
            {/* Full-page container with background image */}
            <div 
                className="box fixed img" 
                style={{ 
                    backgroundImage: `url(${BGImage})`, 
                     backgroundSize:'cover', top: `0%`, left: `0%`, width:`100%`, height:`100%`
                }}
            >
                {/* App title positioned near top center */}
                <h1 
                    className="title fixed" 
                    style={{ 
                        top: '5%', 
                        left: '0%', 
                        width: '100%', 
                        height: '20%' 
                    }}
                >
                    Kolmipiikki
                </h1>

                {/* "Start" button centered near middle of the screen */}
                <div 
                    className="fixed" 
                    style={{ 
                        top: '45%', 
                        left: '45%', 
                        height: '10%', 
                        width: '10%' 
                    }}
                >
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

