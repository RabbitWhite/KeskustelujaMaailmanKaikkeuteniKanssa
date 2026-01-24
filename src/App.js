import './App.css';
import Kolmikarki_front_page from './components/kolmikarki_front_page.js';
import Kolmikarki_poem_page from './components/kolmikarki_poem_page';
import Kolmikarki_next_poem_page from './components/kolmikarki_next_poem_page.js';

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import data from './data/Poems.json'
import PoemsContext from './context/PoemsContext';

const poemsJSON = data.poemsData

function App() {
  return (
    <div className="App">
      <PoemsContext.Provider value={poemsJSON}>
        <Router>
          <Routes>
            <Route path="/" element={<Kolmikarki_front_page />} />
            <Route path="/poem/" element={<Kolmikarki_poem_page />} />
            <Route path="/poemrerun/" element={<Kolmikarki_poem_page isRerun />} />
            <Route path="/nextpoem/" element={<Kolmikarki_next_poem_page />} />
          </Routes>
        </Router>
      </PoemsContext.Provider>
    </div>
  );
}

export default App;
