import Functional_text from "./functional_text";
import Functional_image from "./functional_image"
import { Fragment } from "react";

import DFImage from "./../images/Dragonfly.png";
import BGImage from "./../images/Background_image_front_page.png";

import Poems from "./poems.js";



export default function Kolmikarki_front_page(props) {
    return (

        <Fragment>
            <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
                <Functional_text tag="h1" class="title fixed" style={{top: `10%`, left: `0%`, width:`100%`, height:`10%`}}  fontsize='5vw' newText="Kolmikärki"/>
                <Functional_image class="fixed" style={{top: `30%`, left: `45%`, width:`10%`, height:`10%`}} newImage={DFImage}/>
                <Functional_image class="fixed" style={{top: `80%`, left: `20%`, width:`10%`, height:`10%`}} newImage={DFImage}/>
                <Functional_image class="fixed" style={{top: `80%`, left: `70%`, width:`10%`, height:`10%`}} newImage={DFImage}/>
            </div>
        </Fragment>
    )
}


 //Kolmikarki_front_page