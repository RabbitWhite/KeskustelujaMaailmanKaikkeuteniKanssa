import Functional_text from "./functional_text";
import Functional_image from "./functional_image"
import { Fragment } from "react";

import DFImage from "./../images/Dragonfly.png";
import BGImage from "./../images/Background_image_front_page.png";

import Poems from "./../data/Poems.json";

export default function Kolmikarki_front_page(props) {
    return (
        /*
        <Fragment>
            <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
                <Functional_text tag="h1" class="title" style={{right: `80%`}} newText="Kolmikärki2"/>
                <Functional_image class="fixed" style={{right: `80%`, width:`20%`, height:`20%`}} newImage={DFImage}/>
            </div>
        </Fragment>
        */
        <>
        <div>
        <table border="2">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                </tr>
                // Mapping array of objects
                {Poems.poemsData && Poems.poemsData.map((item, i) => (
                    <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.lines}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
    )
}


 //Kolmikarki_front_page