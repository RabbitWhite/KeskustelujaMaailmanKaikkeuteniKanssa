import { Fragment } from "react";
import { useLocation } from 'react-router-dom'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Poems from "./poems.js";

import BGImage from "./../images/Kolmikarki_Background.png";

const Kolmikarki_poem_page =  (props) =>  {  
  const location = useLocation()
  console.log(JSON.stringify(location.state))
  let { from:fromWhichPoem, new:toWhichPoem} = location.state
  console.log("to"+toWhichPoem) 

  let poemsData = props.poemsdata
  const navigate = useNavigate();
  const nextPoemPath = "/nextpoem/"; 
  const readingDelay = 10000;
  
  useEffect(() => {
    setTimeout(() => {
      console.log("STo"+toWhichPoem)
      poemsData = props.poemsdata
      navigate(nextPoemPath, {state: {a:toWhichPoem, b:poemsData}} )
      
    }, readingDelay)
  }, [navigate])

  return (
    <Fragment>
      <div className="box" style={{ backgroundImage: `url(${BGImage})`}}>
        <Poems currentPoem = {toWhichPoem} poemsdata = {poemsData}/>        
      </div>  
    </Fragment>
  )
}
export default Kolmikarki_poem_page;
  

