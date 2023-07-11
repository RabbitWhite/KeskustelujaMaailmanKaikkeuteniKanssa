import {Link, useParams } from "react-router-dom";

import data from './../data/Poems.json'
/*
const poems = [
  ['Aral', '<pre class="poemtext">\n\nAral\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  ['Kalantakoja','<pre class="poemtext">\n\nKalantakoja\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  ['Tunnustuainen','<pre class="poemtext">\n\nTunnustuainen\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  [],
];
*/
const poemsJSON = data.poemsData

function createMarkup(currentPoemName) {
    let currentPoemCell = poemsJSON.findIndex(item => item.name === (currentPoemName))
    console.log("ho" + currentPoemCell)
    if (currentPoemCell != -1)
      return {__html:  poemsJSON[currentPoemCell].content};
    else 
      return {__html:  poemsJSON[0].content};
}

export default function Poems(props) {
  const {id} = useParams()
  let index = 0
  if (props.currentPoem !== "default") 
    index = poemsJSON.findIndex(item => item.name === props.currentPoem)

    return <div className="poemcontainer" dangerouslySetInnerHTML={createMarkup(props.currentPoem)}/>;
}