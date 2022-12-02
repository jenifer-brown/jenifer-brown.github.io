import SingleResult from "./SingleResult";

export default function Results(props) {
	const { number, genre, decade, runtime } = props;
	const [resultsArray, setResultsArray] = React.useState([]);
	const [start, setStart] = React.useState(false);
	const [allData, setAllData] = React.useState([]);

	React.useEffect(() => {
		let page = 1;
		let promises = [];
		const data = [];
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
						}
					});
				}
				setAllData(data);
			})
			.catch((err) => {
				const searchResults = " ERROR: " + err;
				console.log(searchResults);
			});
	}, []);

	function addResults() {
		const invalidResults = [];
		const selectedResults = [];

		while (
			invalidResults.length + selectedResults.length < allData.length &&
			selectedResults.length < number
		) {
			const index = getRandNum(selectedResults, invalidResults);
			const entry = allData[index];
			isValidEntry(entry)
				? selectedResults.push(entry)
				: invalidResults.push(entry);
		}
		console.log("selected results size: " + selectedResults.length);
		return selectedResults;
	}

	function isValidEntry(entry) {
		if (decade) {
			const decadeMin = parseInt(decade);
			const decadeMax = decadeMin + 9;
			const year = parseInt(entry.release_date);
			if (year < decadeMin || year > decadeMax) {
				return false;
			}
		}
		if (genre) {
			if (!entry.genre_ids.includes(parseInt(genre))) {
				return false;
			}
		}
		if (runtime) {
			const entryRuntime = getRuntime(entry);
			console.log("runtime" + entryRuntime.then(() => runtime));
			if (entryRuntime || entryRuntime > parseInt(runtime)) {
				return false;
			}
		}
		return true;
	}

	function getRuntime(entry) {
		let runtime;
		fetch(
			`https://api.themoviedb.org/3/movie/${entry.id}?api_key=d8cb9be625954d1f4e586efec42d4e79&language=en-US`
		)
			.then((response) => response.json())
			.then((output) => {
				console.log(output.runtime);
				runtime = output.runtime;
			})
			.catch((err) => {
				const searchResults = " ERROR: " + err;
				console.log(searchResults);
			});
		return runtime;
	}

	function getRandNum(selectedResults, invalidResults) {
		let index;
		const max = allData.length;
		do {
			index = Math.floor(Math.random() * max);
		} while (
			selectedResults.includes(allData[index]) &&
			invalidResults.includes(allData[index])
		);
		return index;
	}
	React.useEffect(() => {
		const selectedResults = addResults();
		console.log(allData);
		const allResults = selectedResults.map((entry) => (
			<SingleResult
				title={entry.title}
				img={`https://image.tmdb.org/t/p/w500${entry.poster_path}`}
				year={entry.release_date.substring(0, 4)}
				summary={entry.overview}
				movieId={entry.id}
			/>
		));
		setResultsArray(allResults);
	}, [allData, number]);

	return (
		<div className="results">
			{number === 0 && <h1>Select Suggestions</h1>}
			{resultsArray}
		</div>
	);
}
