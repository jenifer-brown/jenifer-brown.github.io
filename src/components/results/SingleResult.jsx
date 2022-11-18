
export default function SingleResult(props) {
    const {title, img, year, summary, movieId } = props;
    const resultId = `movie-${movieId}`;
    return (
        <div id={resultId} className="singleResult">
            <h1>{title}</h1>
            <h2>{year}</h2>
            <img src={img}/>
            <p>{summary}</p>
        </div>
    )
}