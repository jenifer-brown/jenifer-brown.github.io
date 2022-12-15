import SingleResult from "./SingleResult";

export default function Results(props) {
	const { number, genre, decade, runtime, update, type } = props;
	const [resultsArray, setResultsArray] = React.useState([]);
	const allData = React.useRef([]);
	const runtimeData = React.useRef(undefined);
	const noResults = React.useRef(<SingleResult title="No Results Found!" />);

	React.useEffect(() => {
		let page = 1;
		let promises = [];
		const data = [];
		const runtimeMap = new Map();
		if (type === "movies") {
			console.log("movies");
			while (page < 14) {
				const fetchPromise = fetch(
					`https://api.themoviedb.org/3/keyword/264386-lesbian/movies?api_key=d8cb9be625954d1f4e586efec42d4e79&language=en-US&include_adult=false&page=${page}`
				);
				promises.push(fetchPromise);
				page++;
			}
			Promise.all(promises)
				.then((responses) => {
					for (const response of responses) {
						const output = response.json();
						output.then((result) => {
							if (result.id) {
								data.push(...result.results);
								for (const entry of result.results) {
									fetch(
										`https://api.themoviedb.org/3/movie/${entry.id}?api_key=d8cb9be625954d1f4e586efec42d4e79&language=en-US`
									)
										.then((data) => data.json())
										.then((newOutput) => {
											runtimeMap.set(newOutput.title, newOutput.runtime);
										})
										.catch((err) => {
											const searchResults = " ERROR: " + err;
											console.log(searchResults);
										});
								}
							}
						});
					}
					runtimeData.current = runtimeMap;
					allData.current = data;
				})
				.catch((err) => {
					const searchResults = " ERROR: " + err;
					console.log(searchResults);
				});
		} else if (type === "shows") {
			console.log("shows");
			const fetchPromise = fetch(
				`https://api.themoviedb.org/3/list/8231707?api_key=d8cb9be625954d1f4e586efec42d4e79&language=en-US`
			)
				.then((response) => response.json())
				.then((output) => {
					data.push(...output.items);
					console.log(output.items);
				})
				.catch((err) => {
					const searchResults = " ERROR: " + err;
					console.log(searchResults);
				});
			allData.current = data;
		}
	}, [type]);

	function addResults() {
		const invalidResults = [];
		const selectedResults = [];
		console.log("add results");
		console.log("data length: " + allData.current.length);

		while (
			invalidResults.length + selectedResults.length < allData.current.length &&
			selectedResults.length < number
		) {
			const index = getRandNum(selectedResults, invalidResults);
			const entry = allData.current[index];
			console.log("add entry: " + entry);
			//const isValid = isValidEntry(entry);
			// isValid && !selectedResults.includes(entry)
			// 	? selectedResults.push(entry)
			// 	: !invalidResults.includes(entry)
			// 	? invalidResults.push(entry)
			// 	: {};
			selectedResults.push(entry);
		}
		return selectedResults;
	}

	function isValidEntry(entry) {
		if (decade) {
			const decadeMin = parseInt(decade);
			const decadeMax = decadeMin + 9;
			const year = parseInt(entry.release_date);
			if (!year || year < decadeMin || year > decadeMax) {
				return false;
			}
		}
		if (genre) {
			if (!entry.genre_ids.includes(parseInt(genre))) {
				return false;
			}
		}
		if (runtime) {
			const entryRuntime = runtimeData.current.get(entry.title);
			if (!entryRuntime || parseInt(entryRuntime) > parseInt(runtime)) {
				return false;
			}
		}
		return true;
	}

	function getRandNum(selectedResults, invalidResults) {
		let index;
		const max = allData.current.length;
		do {
			index = Math.floor(Math.random() * max);
		} while (
			selectedResults.includes(allData.current[index]) &&
			invalidResults.includes(allData.current[index])
		);
		return index;
	}

	React.useEffect(() => {
		if (number > 0) {
			const selectedResults = addResults();
			let allResults;
			if (type === "movies") {
				allResults = selectedResults.map((entry) => (
					<SingleResult
						title={entry.title}
						img={`https://image.tmdb.org/t/p/w500${entry.poster_path}`}
						year={entry.release_date.substring(0, 4)}
						summary={entry.overview}
						movieId={entry.id}
						runtime={runtimeData.current.get(entry.title)}
					/>
				));
			} else if (type === "shows") {
				console.log("map shows");
				allResults = selectedResults.map((entry) => {
					console.log(entry);
					return (
						<SingleResult
							title={entry.name}
							img={`https://image.tmdb.org/t/p/w500${entry.backdrop_path}`}
							year={entry.first_air_date.substring(0, 4)}
							summary={entry.overview}
							movieId={entry.id}
						/>
					);
				});
			}
			if (allResults.length === 0) {
				allResults.push(noResults.current);
			}
			setResultsArray(allResults);
		}
		return () => {
			console.log("done");
		};
	}, [allData.current, number, update]);

	return (
		<div className="results">
			{number === 0 && <h1>Select Suggestions</h1>}
			{resultsArray}
		</div>
	);
}
