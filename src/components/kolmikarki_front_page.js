import React from "react";
import { Fragment } from "react";
import {Link} from "react-router-dom";

import 'react-tooltip/dist/react-tooltip.css'

import BGImage from "./../images/Kolmikarki_Background.png";


export default function Kolmikarki_front_page(props) {
    return (
        <Fragment>
            <div className="box" style={{ backgroundImage: `url(${BGImage})`, backgroundSize:'cover'}}>
                <h1 className="title fixed" style={{top: `5%`, left: `0%`, width:`100%`, height:`20%`}}>Kolmipiikki</h1>
                <Link to="/poem/" className = "poemlink fixed" state={{ from: 'Default' }} style={{top: `45%`, left: `0%`, width:`100%`, height:`20%`}}>Aloita</Link>
            </div>
        </Fragment>
    )
}