import {Link} from "react-router-dom";
import { Fragment } from "react";
import { useLocation } from 'react-router-dom'

import BGImage from "./../images/Kolmikarki_Background.png";

function fetchKinPoems(currentPoemName, poemsdata) {
  
  let currentPoemCell
  
  if (poemsdata !== undefined)
  {
    currentPoemName = JSON.stringify(currentPoemName)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    currentPoemCell = poemsdata.findIndex(item => item.name === currentPoemName)
    
    if (currentPoemCell !== -1)
    {
      return poemsdata[currentPoemCell].kinpoems;
    }
    else
    {
      return poemsdata[0].kinpoems;
    }
  }
  else 
  {
    return [1,2];
  }
}

function fetchThePoem(currentPoemName, poemsdata) {
      
  let currentPoemCell

  if (poemsdata !== undefined)
  {
    currentPoemName = JSON.stringify(currentPoemName)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    currentPoemCell = poemsdata.findIndex(item => item.name === currentPoemName)

    if (currentPoemCell !== -1)
      {
        return poemsdata[currentPoemCell].id;
      }
    else
    {
      return 0;
    }
  }
  else 
  {
    return 0;
  }
}


export default function Kolmikarki_next_poem(props, {navigation, route}) {

   const { state } = useLocation();
  let poemsData = {state}.state.b
  let selectedItem = []
  let fromPoem = Object.values({state}.state.a)
  let kinPoems = fetchKinPoems(fromPoem, {state}.state.b)

  let i = 0
  while (i < kinPoems.length)
  {
    selectedItem.push(poemsData.find(item => item.id == kinPoems[i]));
    i++
  }

  let currentPoem = []
  if (poemsData.find(item => item.id == fetchThePoem(fromPoem, {state}.state.b) !== undefined))
  {
    currentPoem.push(poemsData.find(item => item.id == fetchThePoem(fromPoem, {state}.state.b)))
  }

  return (
    <Fragment>
      <div className="box" style={{ backgroundImage: `url(${BGImage})`, backgroundSize:'cover' }}>
        
        <div>
        {
          selectedItem.map((data, key)=>{
          var index = key*10+15
          index = index + `%`

          return(
            <Fragment key={key}><Link  to="/poem/" className = "poemlink fixed" state={{ from: selectedItem[key].name }} style={{top: index, left: `0%`, width:`100%`, height:`20%`}}>{selectedItem[key].name}</Link><br></br></Fragment>
          );
          })        
        } 
        </div>
        
        <div>          
        {
          currentPoem.map((data, key)=>{
          var index2 = selectedItem.length*10+30
          index2 = index2 + `%`

          return(
            <Fragment key={key}><Link  to="/poem/" className = "poemlink fixed" state={{ from: currentPoem[key].name }} style={{top: index2, left: `0%`, width:`100%`, height:`20%`}}>Lue uudelleen</Link><br></br></Fragment>
          );
          })
        }
        </div>
      </div>
    </Fragment>
  );
}