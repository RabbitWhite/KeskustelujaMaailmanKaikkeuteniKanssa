import './App.css';
import FrontPage from './components/FrontPage';
import PoemPage from './components/PoemPage';
import ContentsPage from './components/ContentsPage';

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import data from './data/PoemsKinsStyled.json'
import PoemsContext from './context/PoemsContext';

const poemsJSON = data.poemsData

function App() {
  return (
    <div className="App">
      <PoemsContext.Provider value={poemsJSON}>
        <Router>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/poem/" element={<PoemPage />} />
            <Route path="/poemrerun/" element={<PoemPage isRerun />} />
            <Route path="/contents/" element={<ContentsPage />} />
          </Routes>
        </Router>
      </PoemsContext.Provider>
    </div>
  );
}

export default App;
