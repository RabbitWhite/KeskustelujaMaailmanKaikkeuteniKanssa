import './App.css';
import Kolmikarki_front_page from './components/kolmikarki_front_page.js';
import Kolmikarki_poem_page from './components/kolmikarki_poem_page';
import Kolmikarki_poem_rerun_page from './components/kolmikarki_poem_rerun_page';
import Kolmikarki_next_poem_page from './components/kolmikarki_next_poem_page.js';

import {HashRouter as Router, Route, Routes, HashRouter} from "react-router-dom";

import data from './data/Poems.json'

const poemsJSON = data.poemsData

function App() {
  return (
    <HashRouter base="/">
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Kolmikarki_front_page />} />
          <Route path="/poem/" element={<Kolmikarki_poem_page poemsdata ={poemsJSON}/>} />
          <Route path="/poemrerun/" element={<Kolmikarki_poem_rerun_page poemsdata ={poemsJSON}/>} />
          <Route path="/nextpoem/" element={<Kolmikarki_next_poem_page />} />
        </Routes>
      </Router>
      </div>
      </HashRouter>
  );
}

export default App;
