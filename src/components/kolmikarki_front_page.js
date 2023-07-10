import React from "react";
import { Fragment } from "react";
import 'react-tooltip/dist/react-tooltip.css'

import Functional_text from "./functional_text";
import Functional_image from "./functional_image"

import SuomuKuve_Image from "./../images/Suomukuve.png";
import SorjaRuoja_Image from "./../images/SorjaRuoja.png";
import HuotraPenikka_Image from "./../images/HuotraPenikka.png";
import BGImage from "./../images/Background_image_front_page.png";


export default function Kolmikarki_front_page(props) {
    return (
        <Fragment>
            <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
                <Functional_text tag="h1" class="title fixed" style={{top: `5%`, left: `0%`, width:`100%`, height:`10%`}}  fontsize='5vw' newText="Kolmipiikki"/>
                <Functional_image class="fixed" style={{top: `20%`, left: `45%`, width:`10%`, height:`10%`}} theImage={SorjaRuoja_Image} displayText="SorjaRuoja"/>
                <Functional_image class="fixed" style={{top: `70%`, left: `20%`, width:`10%`, height:`10%`}} theImage={HuotraPenikka_Image} displayText="HuotraPenikka"/>
                <Functional_image class="fixed" style={{top: `70%`, left: `70%`, width:`10%`, height:`10%`}} theImage={SuomuKuve_Image} displayText="SuomuKuve"/>                
            </div>
        </Fragment>
    )
}
