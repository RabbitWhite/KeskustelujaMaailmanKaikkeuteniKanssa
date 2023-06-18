import React, { useState } from 'react';

import {Link } from "react-router-dom";

export default function Functional_text(props) {
  const [text, setText ] = useState(props.newText)

  
  //return <div className={props.class} style={props.style} onClick={()=>setText(props.newText)}><props.tag style={{fontSize: props.fontsize}}>{text}</props.tag></div> 

  return <div className={props.class} style={props.style}>
      <Link to="/poem" state={{ from: false }}>
          <props.tag style={{fontSize: props.fontsize}}>{text}</props.tag> 
      </Link>
    </div> 

  }
