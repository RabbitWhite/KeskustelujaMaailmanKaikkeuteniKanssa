import Functional_text from "./functional_text";
import Functional_image from "./functional_image"
import { Fragment } from "react";

import {Link } from "react-router-dom";

import DFImage from "./../images/Dragonfly.png";
import BGImage from "./../images/Background_image_front_page.png";

import Poems from "./poems.js";

import { useLocation } from 'react-router-dom'

import { useEffect, useRef, useState} from 'react'





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

  const [nextpoems, setnextpoems ] = useState(false)

  useTimeout(() => {
    setnextpoems(true)
    console.log(nextpoems)
  }, 5000);

  if (!nextpoems)
    return (
      <Fragment>
        <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
          <Poems indiex = {from}/> 

          
          
        </div>  
      </Fragment>
    )
  else
  return (
    <Fragment>
      <div className="poemlink">
        <Link to="/nextpoem">Siirry seuraavaan runoon</Link>
      </div>
    </Fragment>
  )
  }
  export default Kolmikarki_poem_page;
  
/*
<div className="poemlink">
<Link to="/nextpoem">Siirry seuraavaan runoon</Link>
</div>
*/
