const poems = [
  ['Aral', '<pre class="poemtext">\n\nAral\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  ['Kalantakoja','<pre class="poemtext">\n\nKalantakoja\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  ['Tunnustuainen','<pre class="poemtext">\n\nTunnustuainen\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  [7, 'itt'],
];

function createMarkup(indexy) {
    let elem = poems.find((sinpo) => sinpo.includes(indexy))// indexOf('itt') > -1);
    console.log(elem)
    if (elem != undefined)
      return {__html:  elem[1]};
    else 
      return {__html:  poems[0][1]};
}

export default function Poems(props) {
    return <div className="poemcontainer" dangerouslySetInnerHTML={createMarkup(props.indiex)} />;
}