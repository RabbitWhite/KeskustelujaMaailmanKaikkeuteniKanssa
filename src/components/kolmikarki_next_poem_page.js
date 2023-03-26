import {Link } from "react-router-dom";

import { Fragment } from "react";

import BGImage from "./../images/Background_image_front_page.png";

export default function Kolmikarki_next_poem(props) {
    return <Fragment>
    <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
      <h1>knp, {props.name}</h1>;
        <Link to="/poem" state={{ from: "kalantakoja" }}><p>Kalantakoja</p></Link>
        <Link to="/poem" state={{ from: "Tunnustuainen" }}><p>Tunnustuainen</p></Link>
    </div>
    </Fragment>
    
  }