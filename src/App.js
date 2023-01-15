import './App.css';
import Kolmikarki_front_page from './components/Kolmikarki_front_page.js';
import Background_image_front_page from './images/Background_image_front_page.png';
import Static_image from './components/static_image.js';
import Static_text from './components/static_text.js';

function App() {
  return (
    <div className="App" style={{backgroundImage : `url(${Background_image_front_page})`, height:"100vh"}}>
      <Static_text name= "Kolmikärki" />
      </div>
  );
}

export default App;
