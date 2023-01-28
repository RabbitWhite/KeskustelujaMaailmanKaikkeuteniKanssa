import Background_image_front_page from './../images/Background_image_front_page.png';
import Dragonfly_image from './../images/Dragonfly.png';
import Static_image from './static_image.js';
import Static_text from './static_text.js';

function Kolmikarki_front_page(props) {
  return (
    <div className="App" style={{backgroundImage : `url(${Background_image_front_page})`, height:"100vh"}}>
      <Static_text name= "Kolmikärki" />
      <Static_image name={Dragonfly_image}/>
      </div>
  );
  }

  export default Kolmikarki_front_page