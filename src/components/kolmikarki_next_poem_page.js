import {Link } from "react-router-dom";

import { Fragment } from "react";

import BGImage from "./../images/Background_image_front_page.png";

export default function Kolmikarki_next_poem(props) {
    return <Fragment>
    <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
      <h1>knp, {props.name}</h1>;
        <Link to="/poem" className= "poemlink" state={{ from: "kalantakoja" }}>Kalantakoja</Link>
        <Link to="/poem" className= "poemlink" state={{ from: "Tunnustuainen" }}>Tunnustuainen</Link>
    </div>
    </Fragment>
    
  }