import {Link, useParams } from "react-router-dom";

import { Fragment } from "react";

import BGImage from "./../images/Background_image_front_page.png";

import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Kolmikarki_next_poem(props, {navigation, route}) {
  const location = useLocation()
  const navigate = useNavigate();
    const {id} = useParams();
    console.log("WTF", id)
    console.log("WTF2", useParams())
    return (<Fragment>
    <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
      <div className="poemlink">
      <h1>Valitse seuraava runo{props.name}</h1>
        <Link to="/poem" className= "poemlink" state={{ from: "Kalantakoja" }}>Kalantakoja</Link><br></br>
        <Link to="/poem" className= "poemlink" state={{ from: "Tunnustuainen" }}>Tunnustuainen</Link>
        <h1>Palaa</h1>
        <Link to="/poem" className= "poemlink" state={{ from: id }}>palaaa</Link><br></br>
      </div>
    </div>
    </Fragment>
    )
  }