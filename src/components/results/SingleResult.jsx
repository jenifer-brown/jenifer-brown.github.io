export default function SingleResult(props) {
	const { title, img, year, summary, movieId, runtime } = props;
	const resultId = `movie-${movieId}`;

	return (
		<div id={resultId} className="singleResult">
			<h1>{title}</h1>
			<h2>
				{year} {runtime ? `(${runtime} mins)` : ""}
			</h2>
			<img src={img ? img : "../../images/noimage.jpeg"} />
			<p>{summary}</p>
		</div>
	);
}
