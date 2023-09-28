import {Link} from "react-router-dom";
import { Fragment } from "react";
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";

import BGImage from "./../images/Kolmikarki_Background.png";

function getRandom(min, max) {
  const floatRandom = Math.random()

  const difference = max - min

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom)

  const randomWithinRange = random + min

  return randomWithinRange
}

function fetchKinPoems(currentPoemName, poemsdata) {
  
  let currentPoemCell
  
  if (poemsdata !== undefined)
  {
    console.log("nextpoemslic:   "+ currentPoemName)/*
    currentPoemName = JSON.stringify(currentPoemName)
    console.log("nextpoem:   "+ currentPoemName)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)*/
    currentPoemCell = poemsdata.findIndex(item => item.name === currentPoemName)

    


    console.log("curpoce:   "+ currentPoemCell)
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
    console.log("nextpoemslic:   "+ currentPoemName)/*
    currentPoemName = JSON.stringify(currentPoemName)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)*/
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

var tarpoe = 1

function setSomething(val)
{
  tarpoe = val.target.value 
    console.log(tarpoe);
}

function setSomething2()
{

  
    console.log("let's move to " + tarpoe);

    

}

export default function Kolmikarki_next_poem(props, {navigation, route}) {

   const { state } = useLocation();
   const navigate = useNavigate();

  let poemsData = {state}.state.b
  let fromPoem =""
if ({state}.state.a != undefined)
{
  fromPoem = Object.values({state}.state.a)
}
  console.log("NPE"+fromPoem+{state}.state.a)
  let kinPoems = fetchKinPoems({state}.state.a, {state}.state.b)
/* 
  let i = 0
  while (i < kinPoems.length)
  {
    selectedItem.push(poemsData.find(item => item.id == kinPoems[i]));
    i++
  }
  */
  let i = getRandom(0, kinPoems.length-1)
  let selectedkinPoem = []
  if (i < kinPoems.length)
    selectedkinPoem.push(poemsData.find(item => item.id == kinPoems[i]));
/*
  i++
  let secondKinPoem = []
  if (i < kinPoems.length)
    secondKinPoem.push(poemsData.find(item => item.id == kinPoems[1]));
*/
  let currentPoem = []
  let prevPoem = []
  let nextPoem = []
  if (poemsData.find(item => item.id == fetchThePoem({state}.state.a, {state}.state.b) !== undefined))
  {
    currentPoem.push(poemsData.find(item => item.id == fetchThePoem({state}.state.a, {state}.state.b)))
    prevPoem.push(poemsData.find(item => (item.id-2)+3 == fetchThePoem({state}.state.a, {state}.state.b)))
    nextPoem.push(poemsData.find(item => (item.id-1) == fetchThePoem({state}.state.a, {state}.state.b)))
  }

  console.log(prevPoem[0] + ":" + prevPoem[1])

  console.log("CurPo"+ JSON.stringify(currentPoem[0]))
  console.log("PrevPo"+ JSON.stringify(prevPoem[0]))
  console.log("NextPo"+ JSON.stringify(nextPoem[0]))

  const [count, setCount] = useState(1);

  useEffect(() => {
    //navigate('/poem')
    //console.log("mt" + tarpoe)
  });

  let fsPoemid = 1

  function uf(val)
  {
    fsPoemid = val
  }

  function us(fr, ne)
  {
    console.log("mt" + count)
    console.log(fr)
    navigate('/poem', {state: {from:fr, new:poemsData[ne].name}})
  }
  
  return (
    <Fragment>
      <div className="box fixed img" style={{ backgroundImage: `url(${BGImage})`, backgroundSize:'cover', top: `0%`, left: `0%`, width:`100%`, height:`100%` }}>
        {      
          currentPoem.map((data, key)=>{
          var index = 15
          index = index + `%`
          
          return(
            <Fragment key={key}><Link  to="/poemrerun/" className = "fixed"             
            state={{ from: {state}.state.a, new:selectedkinPoem[0].name}} style={{top: index, left: `30%`, width:`40%`, height:`10%`}}>
            <div className = "poemlink">Lue "{currentPoem[0].name }" uudelleen</div></Link><br></br>
            
            </Fragment>
            
            );
          })       
        } 
        
                  
        {
          selectedkinPoem.map((data, key)=>{
          var index2 = 60
          index2 = index2 + `%`

          return(
            <Fragment key={key}><Link  to="/poem/" className = "fixed" 
            state={{ from: currentPoem[0].name, new:selectedkinPoem[0].name }} 
            style={{top: index2, left: `30%`, width:`40%`, height:`10%` }}>
            <div className = "poemlink">Sattuman saattelema sisarruno: {selectedkinPoem[0].name}</div></Link><br></br>
           
            </Fragment>
          );
          })
        }

        {
          prevPoem.map((data, key)=>{
          var index3 = 60
          index3 = index3 + `%`

          return(
            <Fragment key={key}><Link  to="/poem/" className = "fixed" 
            state={{ from: currentPoem[0].name, new:prevPoem[0].name }} 
            style={{top: `80%`, left: `20%`, width:`30%`, height:`10%` }}>
            <div className = "poemlink">Edellinen</div></Link><br></br>
           
            </Fragment>
          );
          })
        }

        {
          nextPoem.map((data, key)=>{
          var index3 = 60
          index3 = index3 + `%`

          return(
            <Fragment key={key}><Link  to="/poem/" className = "fixed" 
            state={{ from: currentPoem[0].name, new:nextPoem[0].name }} 
            style={{top: `80%`, left: `50%`, width:`30%`, height:`10%` }}>
            <div className = "poemlink">Seuraava</div></Link><br></br>
           
            </Fragment>
          );
          })
        }
        
        
        


        
        

      </div>
    </Fragment>
  );
}

/*
<fragment className = "fixed" style={{top: `80%`, left: `45%`, width:`10%`, height:`10%` }}>
        <table  className = "poemlink">
  <tr>
    <th><input className = "poemlink" name="myInput" defaultValue="1" onChange={e => uf(e.target.value)} style ={{background: `transparent`}}/></th>
    <th>/{poemsData.length}</th>
    <th><button className = "poemlink" onClick={() => us(currentPoem[0].name, fsPoemid)}>Siirry runoon</button></th>
  </tr>
  </table>
  </fragment>
  */
