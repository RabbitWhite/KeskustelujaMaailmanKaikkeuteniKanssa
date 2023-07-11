import {Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import { useLocation } from 'react-router-dom'

import BGImage from "./../images/Background_image_front_page.png";
import data from './../data/Poems.json'

export default function Kolmikarki_next_poem(props, {navigation, route}) {

    const {id} = useParams()

    const poemsJSON = data.poemsData
    
    function fetchKinPoems(currentPoemName) {
      let currentPoemCell = poemsJSON.findIndex(item => item.name === (currentPoemName))
      console.log("was" + currentPoemCell)
      if (currentPoemCell != -1)
      return poemsJSON[currentPoemCell].kinpoems;
    else 
      return [];
    }
    
    return (<Fragment>
    <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
      <div className="poemlink">
        <h1>Valitse seuraava runo{props.name}</h1>
        <h1>{fetchKinPoems(id)}</h1>
        <Link to="/poem/" className= "poemlink" state={{ from: "Kalantakoja" }}>Kalantakoja</Link><br></br>
        <Link to="/poem/" className= "poemlink" state={{ from: "Tunnustuainen" }}>Tunnustuainen</Link>
        
        <h1>Palaa</h1>
        <Link to="/poem/" className= "poemlink" state={{ from: id }}>palaa</Link><br></br>
      </div>
    </div>
    </Fragment>
    )
  }