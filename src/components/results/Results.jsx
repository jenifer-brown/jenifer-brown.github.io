import SingleResult from "./SingleResult";

export default function Results(props) {
	const { number, genre, decade, runtime, update, type } = props;
	const [resultsArray, setResultsArray] = React.useState([]);
	const movieData = React.useRef(undefined);
	const showData = React.useRef(undefined);
	const bookData = React.useRef(undefined);
	const runtimeData = React.useRef(undefined);
	const noResults = React.useRef(<SingleResult title="No Results Found!" />);

	React.useEffect(() => {
		let page = 1;
		let promises = [];
		const data = [];
		const runtimeMap = new Map();
		if (type === "movies") {
			if (!!movieData.current) {
				return;
			}
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
					movieData.current = data;
				})
				.catch((err) => {
					const searchResults = " ERROR: " + err;
					console.log(searchResults);
				});
		} else if (type === "shows") {
			if (!!showData.current) {
				console.log("no show data");
				return;
			}
			console.log("find show data");
			const fetchPromise = fetch(
				`https://api.themoviedb.org/3/list/8231707?api_key=d8cb9be625954d1f4e586efec42d4e79&language=en-US`
			)
				.then((response) => response.json())
				.then((output) => {
					data.push(...output.items);
				})
				.catch((err) => {
					const searchResults = " ERROR: " + err;
					console.log(searchResults);
				});
			showData.current = data;
		} else if (type === "books") {
			if (!!bookData.current) {
				return;
			}
			const fetchPromise = fetch(`https://www.loc.gov/books/?q=lesbian&fo=json`)
				.then((response) => response.json())
				.then((output) => {
					data.push(...output.results);
				})
				.catch((err) => {
					const searchResults = " ERROR: " + err;
					console.log(searchResults);
				});
			bookData.current = data;
		}
	}, [type]);

	function addResults() {
		const invalidResults = [];
		const selectedResults = [];

		while (
			invalidResults.length + selectedResults.length <
				(type === "movies"
					? movieData.current.length
					: type === "shows"
					? showData.current.length
					: bookData.current.length) &&
			selectedResults.length < number
		) {
			const index = getRandNum(selectedResults, invalidResults);
			const entry =
				type === "movies"
					? movieData.current[index]
					: type === "shows"
					? showData.current[index]
					: bookData.current[index];
			const isValid = isValidEntry(entry);
			console.log("is valid entry? : " + isValid);
			isValid && !selectedResults.includes(entry)
				? selectedResults.push(entry)
				: !invalidResults.includes(entry)
				? invalidResults.push(entry)
				: {};
		}
		return selectedResults;
	}

	function isValidEntry(entry) {
		if (decade) {
			const decadeMin = parseInt(decade);
			const decadeMax = decadeMin + 9;
			const year =
				type === "movies"
					? parseInt(entry.release_date)
					: type === "shows"
					? parseInt(entry.first_air_date)
					: parseInt(entry.date);
			if (!year || year < decadeMin || year > decadeMax) {
				return false;
			}
		}
		if (type !== "books" && genre) {
			console.log("genre ids");
			if (!entry.genre_ids.includes(parseInt(genre))) {
				console.log("genre: " + genre);
				console.log("genre ids: " + entry.genre_ids.toString());
				return false;
			}
		}
		if (type === "movies" && runtime) {
			const entryRuntime = runtimeData.current.get(entry.title);
			if (!entryRuntime || parseInt(entryRuntime) > parseInt(runtime)) {
				return false;
			}
		}
		return true;
	}

	function getRandNum(selectedResults, invalidResults) {
		let index;
		const max =
			type === "movies"
				? movieData.current.length
				: type === "shows"
				? showData.current.length
				: bookData.current.length;
		do {
			index = Math.floor(Math.random() * max);
			console.log("find index");
		} while (
			selectedResults.includes(
				type === "movies"
					? movieData.current[index]
					: type === "shows"
					? showData.current[index]
					: bookData.current[index]
			) &&
			invalidResults.includes(
				type === "movies"
					? movieData.current[index]
					: type === "shows"
					? showData.current[index]
					: bookData.current[index]
			)
		);
		return index;
	}

	React.useEffect(() => {
		if (number > 0) {
			const selectedResults = addResults();
			let allResults = [];
			if (type === "movies") {
				allResults = selectedResults.map((entry) => (
					<SingleResult
						title={entry.title}
						img={
							entry.poster_path
								? `https://image.tmdb.org/t/p/w500${entry.poster_path}`
								: ""
						}
						year={entry.release_date.substring(0, 4)}
						summary={entry.overview}
						movieId={entry.id}
						runtime={runtimeData.current.get(entry.title)}
					/>
				));
			} else if (type === "shows") {
				allResults = selectedResults.map((entry) => {
					return (
						<SingleResult
							title={entry.name}
							img={
								entry.backdrop_path
									? `https://image.tmdb.org/t/p/w500${entry.backdrop_path}`
									: ""
							}
							year={entry.first_air_date.substring(0, 4)}
							summary={entry.overview}
							movieId={entry.id}
						/>
					);
				});
			} else if (type === "books") {
				allResults = selectedResults.map((entry) => {
					return (
						<SingleResult
							title={entry.title}
							year={entry.date}
							summary={entry.description}
							isBook={true}
							bookUrl={entry.id}
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
	}, [movieData.current, showData.current, bookData.current, number, update]);

	return (
		<div className="results">
			{number === 0 && <h1>Select Suggestions</h1>}
			{resultsArray}
		</div>
	);
}
