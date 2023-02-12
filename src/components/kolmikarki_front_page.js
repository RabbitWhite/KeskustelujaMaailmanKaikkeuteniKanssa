import Functional_text from "./functional_text";
import Functional_image from "./functional_image"
import { Fragment } from "react";

import DFImage from "./../images/Dragonfly.png";
import BGImage from "./../images/Background_image_front_page.png";

//import Poems from "./../data/Poems.json";
import Poems from "./poems.js";



export default function Kolmikarki_front_page(props) {
    return (

        <Fragment>
            <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
                <Functional_text tag="h1" class="title" style={{right: `80%`}} newText="Kolmikärki2"/>
                <Functional_image class="fixed" style={{right: `80%`, width:`20%`, height:`20%`}} newImage={DFImage}/>
            </div>
           <Poems />
        </Fragment>
    )
}


 //Kolmikarki_front_page