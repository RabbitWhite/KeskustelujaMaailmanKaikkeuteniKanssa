import React, { useState } from 'react';

export default function Functional_text(props) {
  const [text, setText ] = useState("Kolmikärki")

  return <div id="test" className="fixed alert" style={{right: "80%"}} onClick={()=>setText("Ahaa!")}><p>{text}</p></div> 
  }