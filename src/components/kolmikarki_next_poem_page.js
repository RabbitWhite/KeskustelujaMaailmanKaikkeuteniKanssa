import {Link } from "react-router-dom";

import { Fragment } from "react";

import BGImage from "./../images/Background_image_front_page.png";

export default function Kolmikarki_next_poem(props) {
    return <Fragment>
    <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
      <div className="poemlink">
      <h1>Valitse seuraava runo{props.name}</h1>
        <Link to="/poem" className= "poemlink" state={{ from: "Kalantakoja" }}>Kalantakoja</Link><br></br>
        <Link to="/poem" className= "poemlink" state={{ from: "Tunnustuainen" }}>Tunnustuainen</Link>
      </div>
    </div>
    </Fragment>
    
  }