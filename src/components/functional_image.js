import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import {Link } from "react-router-dom";

export default function Functional_image(props) {
  const [image, setImage ] = useState(props.newImage)

  return <div className={props.class} style={props.style} onClick={()=>setImage(props.newImage)}>
      <Link to="/poem" state={{ from: "default" }}>
        <img data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!" style={{display: 'block',  width: '100%' ,  height: 'auto'}} src={image} />
        <Tooltip id="my-tooltip" />
      </Link>
    </div> 
  }

