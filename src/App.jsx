import Action from "./components/generator/Action";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Nvabar from "./components/Navbar";
import "./App.css";
import Navbar from "./components/Navbar";
import Generator from "./components/generator/Generator";
import Results from "./components/results/Results";
import Tab from "./components/generator/Tab";

function App() {
	const [generatorType, setGeneratorType] = React.useState("");
	const [number, setNumber] = React.useState(0);
	const [update, setUpdate] = React.useState(false);
	const [decade, setDecade] = React.useState(undefined);
	const [genre, setGenre] = React.useState(undefined);
	const [runtime, setRuntime] = React.useState(240);

	// Tab Functions
	function handleTabClick(type) {
		console.log(type);
		setGeneratorType(type);
	}

	const tabs = [{ type: "books" }, { type: "movies" }, { type: "shows" }];
	const tabElements = tabs.map((tab) => (
		<Tab type={tab.type} handleClick={() => handleTabClick(tab.type)} />
	));

	// Generator Functions
	function handleSubmit(num) {
		setNumber(num);
		setUpdate((prev) => !prev);
		console.log("submit");
	}

	function getFilters(e, selector) {
		switch (selector) {
			case "decade":
				typeof e.target.value === "string"
					? setDecade(e.target.value)
					: setDecade(undefined);
				console.log("set decade");
				break;
			case "genre":
				typeof e.target.value === "string"
					? setGenre(e.target.value)
					: setGenre(undefined);
				console.log(genre);
				break;
			case "runtime":
				setRuntime(e.target.value);
				console.log("Runtime change: " + e.target.value);
		}
	}

	return (
		<>
			<div className="App">
				<div>
					<Navbar />
				</div>
				<div className="mainContainer">
					<div className="generatorBox">
						<div className="tabs">{tabElements}</div>
						<Generator
							className="generator"
							generatorType={generatorType}
							handleSubmit={handleSubmit}
							getFilters={getFilters}
							decade={decade}
							runtime={runtime}
							genre={genre}
						/>
					</div>
					<div className="resultsBox">
						<Results
							type={generatorType}
							number={number}
							update={update}
							decade={decade}
							runtime={runtime}
							genre={genre}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
