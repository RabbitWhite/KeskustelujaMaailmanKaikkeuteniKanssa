import {useParams } from "react-router-dom";

/*
function createMarkup(currentPoemName, poemsData) {
    let currentPoemCell = poemsData.findIndex(item => item.name === (currentPoemName))
    console.log("cpn" + currentPoemName)
    console.log("ho" + currentPoemCell)
    if (currentPoemCell !== -1)
      return {__html:  "<br>" + "<pre class=\"poemtext\">" + currentPoemCell + "</pre>" + poemsData[currentPoemCell].content};
    else 
      return {__html:  poemsData[0].content};
}*/

function createMarkup(currentPoemName, poemsData) {
  const currentPoemCell = poemsData.findIndex(item => item.name === currentPoemName);
  if (currentPoemCell !== -1) {
    return {
      __html: `
        <div class="poem-wrapper">
          <div class="poem-number">
            <pre class="poemtext">${currentPoemCell}</pre>
          </div>
          <div class="poem-content">
            ${poemsData[currentPoemCell].content}
          </div>
        </div>
      `
    };
  } else {
    return {
      __html: `
        <div class="poem-wrapper">
          <div class="poem-content">
            ${poemsData[0].content}
          </div>
        </div>
      `
    };
  }
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