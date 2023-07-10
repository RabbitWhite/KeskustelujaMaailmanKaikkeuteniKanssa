import data from './../data/Poems.json'

const poems = [
  ['Aral', '<pre class="poemtext">\n\nAral\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  ['Kalantakoja','<pre class="poemtext">\n\nKalantakoja\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  ['Tunnustuainen','<pre class="poemtext">\n\nTunnustuainen\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  [],
];

const poemsJSON = data.poemsData 

function createMarkup(currentPoemName) {
    let currentPoemCell = poems.find((poemsArray) => poemsArray.includes(currentPoemName))
    if (currentPoemCell != undefined)
      return {__html:  currentPoemCell[1]};
    else 
      return {__html:  poems[0][1]};
}

export default function Poems(props) {
  let index = 0
  if (props.currentPoem !== "default") 
    index = poemsJSON.findIndex(item => item.name === props.currentPoem)
  
  let thePoem = poemsJSON[index].start
  console.log(thePoem)
    return <div className="poemcontainer" dangerouslySetInnerHTML={createMarkup(props.currentPoem)} />;
}