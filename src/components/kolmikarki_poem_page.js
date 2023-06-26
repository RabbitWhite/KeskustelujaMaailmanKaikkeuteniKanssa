import Functional_text from "./functional_text";
import Functional_image from "./functional_image"
import { Fragment } from "react";

import {Link, useParams } from "react-router-dom";

import DFImage from "./../images/Dragonfly.png";
import BGImage from "./../images/Background_image_front_page.png";

import Poems from "./poems.js";

import { useLocation } from 'react-router-dom'

import { useEffect, useRef, useState} from 'react'

import { useNavigate } from 'react-router-dom'



function useTimeout(callback, delay) {
  const savedCallback = useRef(callback)



  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return
    }

    const id = setTimeout(() => savedCallback.current(), delay)

    return () => clearTimeout(id)
  }, [delay])
}

const Kolmikarki_poem_page =  (props) =>  {  
  const location = useLocation()
  const { from } = location.state
  const navigate = useNavigate();
  const [nextpoems, setnextpoems ] = useState(from)

  console.log(from)
 
  console.log(nextpoems)
/*
  useTimeout(() => {
    setnextpoems(true)
    useNavigate('/nextpoem')
    console.log(nextpoems)
  }, 5000);
*/
const nurl = "/nextpoem/" + from; 

useEffect(() => {
  setTimeout(() => {
    navigate(nurl)
  }, 5000)
}, [navigate])

  console.log(nextpoems)
    return (
      <Fragment>
        <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
          <Poems indiex = {from}/> 

          
          
        </div>  
      </Fragment>
    )/*
  else
  return (
    /*
    <Fragment>
      <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
        <div className="poemlink">
        <h1>Valitse seuraava runo{props.name}</h1>
          <Functional_text tag="h1" class="title fixed" style={{top: `5%`, left: `0%`, width:`100%`, height:`10%`}}  fontsize='5vw' newText="Kalantakoja"/>
          <Functional_text tag="h1" class="title fixed" style={{top: `10%`, left: `0%`, width:`100%`, height:`10%`}}  fontsize='5vw' newText="Tunnustuainen"/>
        </div>
      </div>
    </Fragment>
    
    
  )*/
  }
  export default Kolmikarki_poem_page;
  
/*
<div className="poemlink">
<Link to="/nextpoem">Siirry seuraavaan runoon</Link>
</div>
*/
