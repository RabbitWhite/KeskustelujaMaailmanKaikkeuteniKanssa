const poems = [
  '<pre class="poemtext">Aral\n\nKuivettuneet kanavat,\nsuolaantuneet silmät.\n\nKöli dyynin harjan päällä,\nkeikkumassa\nkeulakuva aurinkoa kohti.\n\nPolte huulilla,\nsen tippuvat rohteet.\n\n  </pre>'
];

function createMarkup() {
    let elem = poems[0]
    return {__html:  elem};
}

export default function Poems() {
    return <div className="poemcontainer" dangerouslySetInnerHTML={createMarkup()} />;
}