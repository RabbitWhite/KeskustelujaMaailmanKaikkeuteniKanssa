import { Fragment } from "react";
import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Link, useParams } from "react-router-dom";

import Poems from "./poems.js";

import BGImage from "./../images/Background_image_front_page.png";

const Kolmikarki_poem_page =  (props) =>  {  
  const location = useLocation()
  let { from } = location.state
console.log("palaa2 "+ JSON.stringify(from))
  let poemsedata = props.poemsdata
  const navigate = useNavigate();
  const nextPoemPath = "/nextpoem/id/id/"; 
  const readingDelay = 5000;
  
  //console.log("aha" + props.poemsdata)
  useEffect(() => {
    setTimeout(() => {
      from = location.state
      poemsedata = props.poemsdata
      //console.log("ayha" + poemsedata)
      navigate(nextPoemPath, {state: {a:from, b:poemsedata}} )
      
    }, readingDelay)
  }, [navigate])

  return (
    <Fragment>
      <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
        <Poems currentPoem = {from} poemsdata = {poemsedata}/>        
      </div>  
    </Fragment>
  )
}
export default Kolmikarki_poem_page;
  

