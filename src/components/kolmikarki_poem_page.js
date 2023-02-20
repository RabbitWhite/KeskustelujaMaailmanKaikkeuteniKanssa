import Functional_text from "./functional_text";
import Functional_image from "./functional_image"
import { Fragment } from "react";

import DFImage from "./../images/Dragonfly.png";
import BGImage from "./../images/Background_image_front_page.png";

import Poems from "./poems.js";

export default function kolmikarki_poem_page(props) {
  return (
    <Fragment>
    <div className="box" style={{ backgroundImage: `url(${BGImage})` }}>
        <Poems />
    </div>
  </Fragment>
  )
}