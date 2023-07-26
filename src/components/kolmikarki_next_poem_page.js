import {Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import { useLocation } from 'react-router-dom'

import BGImage from "./../images/Background_image_front_page.png";
//import data from './../data/Poems.json'

function fetchKinPoems(currentPoemName, poemsdata) {
      
  //console.log("oh"+poemsdata)
  let currentPoemCell
  if (poemsdata !== undefined)
  {
    console.log("data")
    currentPoemName = JSON.stringify(currentPoemName)
    console.log(currentPoemName)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    console.log(currentPoemName)
    console.log(poemsdata)
    //currentPoemName =( 'Kotelo')
    currentPoemCell = poemsdata.findIndex(item => item.name === currentPoemName)
    console.log(currentPoemCell)
    if (currentPoemCell !== -1)
      {
        console.log("match")
        return poemsdata[currentPoemCell].kinpoems;
      }
    else
    {
      console.log("no match")
      return poemsdata[0].kinpoems;
    }
  }
  else 
  {
    console.log("no data")
    return [1,2];
  }
}

function fetchThePoem(currentPoemName, poemsdata) {
      
  //console.log("oh"+poemsdata)
  let currentPoemCell
  if (poemsdata !== undefined)
  {
    console.log("data")
    currentPoemName = JSON.stringify(currentPoemName)
    console.log(currentPoemName)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    currentPoemName = currentPoemName.slice(0, -1)
    currentPoemName = currentPoemName.slice(1)
    console.log(currentPoemName)
    console.log(poemsdata)
    //currentPoemName =( 'Kotelo')
    currentPoemCell = poemsdata.findIndex(item => item.name === currentPoemName)
    console.log(currentPoemCell)
    if (currentPoemCell !== -1)
      {
        console.log("cmatch")
        return poemsdata[currentPoemCell].id;
      }
    else
    {
      console.log("cno match")
      return 0;
    }
  }
  else 
  {
    console.log("cno data")
    return 0;
  }
}

function listKinpoems(indexes) {
  //console.log("indxs"+indexes.length)
  if(indexes.length > 5){
    let tmp = <Fragment><Link to="/poem/" className = "poemlink" state={{ from: "Kalantakoja" }}>f</Link><br></br></Fragment>
    //tmp += <Fragment><Link to="/poem/" className = "poemlink" state={{ from: "Kalantakoja" }}>g</Link><br></br></Fragment>
    let kcount = indexes.length
    while(kcount > 0)
    {
      tmp += <Fragment><Link to="/poem/" className = "poemlink" state={{ from: "Kalantakoja" }}>g</Link><br></br></Fragment>
      kcount = kcount -1
      //console.log(kcount)
    }
    return tmp
    


  } else {
    return <Fragment><Link to="/poem/" className = "poemlink" state={{ from: "Kalantakoja" }}>f</Link><br></br></Fragment>
  }
  
}

function test(count)
{

}
export default function Kolmikarki_next_poem(props, {navigation, route}) {
//<div className="box" dangerouslySetInnerHTML={listKinpoems(fetchKinPoems({state}.state.a, {state}.state.b))} />
   // const parmst = useParams();
   const { state } = useLocation();

let pooems = {state}.state.b
let selectedItem = []
let froma = Object.values({state}.state.a)

/*entries({state}.state.a).map(([key, value]) => {
  return (
    {value}
  )
})*/
console.log("statea"+froma)
let kinpoems = fetchKinPoems(froma, {state}.state.b)

//froma = JSON.stringify(froma)

console.log("palaa"+froma)

//console.log("kp"+kinpoems[0])
let i = 0
while (i < kinpoems.length)
{
  selectedItem.push(pooems.find(item => item.id == kinpoems[i]));
  i++
}

let curpo = []
if (pooems.find(item => item.id == fetchThePoem(froma, {state}.state.b) !== undefined))
{
  console.log("wtf" + froma)
  curpo.push(pooems.find(item => item.id == fetchThePoem(froma, {state}.state.b)))
}/*
else
  curpo.push(pooems.find(item => item.id == fetchThePoem(tmpa, {state}.state.b)))*/
  console.log("curpo "+JSON.stringify(curpo))
//console.log("qwe"+JSON.stringify(selectedItem))
console.log("qwed"+JSON.stringify(selectedItem))
//console.log(fetchKinPoems({state}.state.a, {state}.state.b))
//console.log(listKinpoems(fetchKinPoems({state}.state.a, {state}.state.b)))

return (
  <Fragment>
    <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
      <div>
      
        {selectedItem.map((data, key)=>{
                  var ind = key*10+15
                  ind = ind + `%`
                        console.log("key"+ind);
                    return(
                      <Fragment key={key}><Link  to="/poem/" className = "poemlink fixed" state={{ from: selectedItem[key].name }} style={{top: ind, left: `0%`, width:`100%`, height:`20%`}}>{selectedItem[key].name}</Link><br></br></Fragment>
                    );
                })
                
              
            } 
      </div>
      <div>
                  
                  {curpo.map((data, key)=>{
                    console.log("L"+selectedItem.length)
                    var ind2 = selectedItem.length*10+30
                    ind2 = ind2 + `%`
                  return(
                    <Fragment key={key}><Link  to="/poem/" className = "poemlink fixed" state={{ from: curpo[key].name }} style={{top: ind2, left: `0%`, width:`100%`, height:`20%`}}>Lue uudelleen</Link><br></br></Fragment>
                  );
                })
        }
      </div>
    </div>
  </Fragment>
);

/*
if (props.poemsdata == null)

    return (<Fragment>
    <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
      <div className="poemlink">
        <h1>Valitse seuraava runo</h1>
        <div>{listKinpoems(fetchKinPoems({state}.state.a, {state}.state.b))} </div>

        <h1>Palaa</h1>
        {fetchKinPoems({state}.state.a, {state}.state.b)}
      </div>
    </div>
    </Fragment>
    )*/
  }