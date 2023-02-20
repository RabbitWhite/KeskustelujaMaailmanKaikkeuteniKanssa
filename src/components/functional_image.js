import React, { useState } from 'react';
import BGImage from "./../images/Background_image_front_page.png";

export default function Functional_image(props) {
  const [image, setImage ] = useState(BGImage)

  return <div className={props.class} style={props.style} onClick={()=>setImage(props.newImage)}>
    <img style={{display: 'block',  width: '100%' ,  height: 'auto'}} src={image} /></div> 
  }

