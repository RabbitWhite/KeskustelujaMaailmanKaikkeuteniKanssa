import Functional_text from "./functional_text";
import Functional_image from "./functional_image"
import { Fragment } from "react";

import {Link } from "react-router-dom";

import DFImage from "./../images/Dragonfly.png";
import BGImage from "./../images/Background_image_front_page.png";

import Poems from "./poems.js";

import { useLocation } from 'react-router-dom'

//export default function kolmikarki_poem_page(props) {

const Kolmikarki_poem_page =  (props) =>  {  
  const location = useLocation()
  const { from } = location.state
  return (
    <Fragment>
      <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
        <Poems index = {location.state} />
        <p>{from}</p>
        <Link to="/nextpoem" className="poemlink">Next poem</Link>
      </div>  
    </Fragment>
  )
  }
  export default Kolmikarki_poem_page; 
