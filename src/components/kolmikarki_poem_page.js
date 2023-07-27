import { Fragment } from "react";
import { useLocation } from 'react-router-dom'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Poems from "./poems.js";

import BGImage from "./../images/Kolmikarki_Background.png";

const Kolmikarki_poem_page =  (props) =>  {  
  const location = useLocation()
  let { from: fromWhichPoem } = location.state
  let poemsData = props.poemsdata
  const navigate = useNavigate();
  const nextPoemPath = "/nextpoem/"; 
  const readingDelay = 10000;
  
  useEffect(() => {
    setTimeout(() => {
      fromWhichPoem = location.state
      poemsData = props.poemsdata
      navigate(nextPoemPath, {state: {a:fromWhichPoem, b:poemsData}} )
      
    }, readingDelay)
  }, [navigate])

  return (
    <Fragment>
      <div className="box" style={{ backgroundImage: `url(${BGImage})`, backgroundSize:'cover' }}>
        <Poems currentPoem = {fromWhichPoem} poemsdata = {poemsData}/>        
      </div>  
    </Fragment>
  )
}
export default Kolmikarki_poem_page;
  

