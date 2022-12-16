export default function SingleResult(props) {
	const { title, img, year, summary, movieId, runtime, isBook, bookUrl } =
		props;
	const resultId = `movie-${movieId}`;

	function bookLinkClick() {
		switch (true) {
			case !!bookUrl:
				return window.open(bookUrl);
			default:
				return;
		}
	}

	function bookLinkValue() {
		switch (true) {
			case !!bookUrl:
				return "Go to Book";
			default:
				return "No Link Available";
		}
	}

	return (
		<div id={resultId} className="singleResult">
			<h1>{title}</h1>
			<h2>
				{year} {runtime ? `(${runtime} mins)` : ""}
			</h2>
			{isBook ? (
				<input
					type="button"
					onClick={() => bookLinkClick()}
					value={bookLinkValue()}
				/>
			) : (
				<img src={img ? img : "../../images/noimage.jpeg"} />
			)}
			<p>{summary}</p>
		</div>
	);
}
