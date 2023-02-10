import React, { useState } from 'react';

export default function Functional_text(props) {
  const [text, setText ] = useState("Kolmikärki")

  return <div className={props.class} style={props.style} onClick={()=>setText(props.newText)}><props.tag>{text}</props.tag></div> 
  }