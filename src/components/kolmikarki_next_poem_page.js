import {Link, useParams } from "react-router-dom";
import { Fragment } from "react";

import BGImage from "./../images/Background_image_front_page.png";

export default function Kolmikarki_next_poem(props, {navigation, route}) {

    const {id} = useParams();
    
    return (<Fragment>
    <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
      <div className="poemlink">
        <h1>Valitse seuraava runo{props.name}</h1>
        <Link to="/poem" className= "poemlink" state={{ from: "Kalantakoja" }}>Kalantakoja</Link><br></br>
        <Link to="/poem" className= "poemlink" state={{ from: "Tunnustuainen" }}>Tunnustuainen</Link>
        
        <h1>Palaa</h1>
        <Link to="/poem" className= "poemlink" state={{ from: id }}>palaa</Link><br></br>
      </div>
    </div>
    </Fragment>
    )
  }