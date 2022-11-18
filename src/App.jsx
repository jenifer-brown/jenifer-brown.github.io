
import Action from "./components/generator/Action";
import { useState }from "react";
import reactLogo from './assets/react.svg';
import Nvabar from "./components/Navbar";
import './App.css'
import Navbar from "./components/Navbar";
import Generator from "./components/generator/Generator";
import Results from "./components/results/Results";
import Tab from "./components/generator/Tab";

function App() {

  
  return (
    <>
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div className="mainContainer">
        <div className="generatorBox">
          <div className="tabs">
            <Tab type="books"/>
            <Tab type="movies" />
            <Tab type="shows" />
          </div>
          <Generator generatorType="Movie" className="generator"/>
        </div>
        <div className="resultsBox">
          <Results />
         </div>
      </div>
    </div>
    </>
  )
}

export default App
