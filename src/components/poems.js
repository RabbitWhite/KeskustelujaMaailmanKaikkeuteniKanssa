const poems = [
  ['<pre class="poemtext">\n\nAral</pre>','<pre class="poemtext">\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  ['Kalantakoja','<pre class="poemtext">Kalantakoja\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'],
  ['Tunnustuainen','<pre class="poemtext">Aral\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>']
];

function createMarkup(indexy) {
    let text = JSON.stringify(indexy[0])
    let elem = (poems.indexOf(text) > -1);
    return {__html:  elem};
}

export default function Poems(props) {
    return <div className="poemcontainer" dangerouslySetInnerHTML={createMarkup(props.index)} />;
}