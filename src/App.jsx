
import Action from "./components/generator/Action";
import { useState }from "react";
import reactLogo from './assets/react.svg';
import Nvabar from "./components/Navbar";
import './App.css'
import Navbar from "./components/Navbar";
import Generator from "./components/generator/Generator";
import Results from "./components/results/Results";

function App() {

  return (
    <>
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div className="generator">
        <Generator generatorType="Movie"/>
      </div>
      <div className="resultsBox">
        <Results />
      </div>
    </div>
    </>
  )
}

export default App
