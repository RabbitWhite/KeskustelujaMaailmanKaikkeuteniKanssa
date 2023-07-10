import { Fragment } from "react";
import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'

import Poems from "./poems.js";

import BGImage from "./../images/Background_image_front_page.png";

const Kolmikarki_poem_page =  (props) =>  {  
  const location = useLocation()
  const { from } = location.state
  const navigate = useNavigate();
  const nextPoemPath = "/nextpoem/" + from; 
  const readingDelay = 5000;
  
  useEffect(() => {
    setTimeout(() => {
      navigate(nextPoemPath)
    }, readingDelay)
  }, [navigate])

  return (
    <Fragment>
      <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
        <Poems currentPoem = {from}/>        
      </div>  
    </Fragment>
  )
}
export default Kolmikarki_poem_page;
  

