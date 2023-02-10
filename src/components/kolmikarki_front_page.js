import Functional_text from "./functional_text";
import Functional_image from "./functional_image"
import { Fragment } from "react";

import DFImage from "./../images/Dragonfly.png";



export default function Kolmikarki_front_page(props) {
    return (
        <Fragment>
        <Functional_text tag="h1" class="alert" style={{right: `80%`}} newText="Kolmikärki2"/>
        <Functional_image class="alert" style={{right: `80%`}} newImage={DFImage}/>
        </Fragment>
    )
}


 //Kolmikarki_front_page