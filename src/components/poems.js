import {useParams } from "react-router-dom";


function createMarkup(currentPoemName, poemsData) {
    let currentPoemCell = poemsData.findIndex(item => item.name === (currentPoemName))
    console.log("cpn" + currentPoemName)
    console.log("ho" + currentPoemCell)
    if (currentPoemCell !== -1)
      return {__html:  poemsData[currentPoemCell].content};
    else 
      return {__html:  poemsData[0].content};
}

export default function Poems(props) {
  const {id} = useParams()
  let index = 0
  let poemsdata = props.poemsdata
  console.log("Poems"+ props.currentPoem)
  if (props.currentPoem !== "default") 
    index = poemsdata.findIndex(item => item.name === props.currentPoem)

    return <div className="poemcontainer" dangerouslySetInnerHTML={createMarkup(props.currentPoem, poemsdata)}/>;
}