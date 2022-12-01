import SingleResult from "./SingleResult"

export default function Results(props) {

    const { number } = props;
    const [resultsArray, setResultsArray] = React.useState([]);
    const [render, setRender] = React.useState(false);


    // make async calls
    React.useEffect(() => {

        const searchResults = "";
        fetch(
            "https://api.themoviedb.org/3/list/2910?api_key=d8cb9be625954d1f4e586efec42d4e79&language=en-US"
        )
          .then((result) => result.json())
          .then((output) => {
            const data = [];
            if (!output.status_code) {
              for (let i = number - 1; i >= 0 ; i--) {
                data.push(output.items[i]);
              }
            }
            console.log(data);
            const addResults = data.map((entry) => 
            <SingleResult 
                title={entry.original_title}
                img={`https://image.tmdb.org/t/p/w500${entry.poster_path}`}
                year={entry.release_date.substring(0, 4)}
                summary={entry.overview}
                movieId={entry.id}
                />);
            setResultsArray(addResults);
          })
          .catch((err) => {
            searchResults = err.status_code + " ERROR: " + err.status_message;
            data.push(searchResults);
            
          });
    }, [number]);

    return (

        <div className="results">
          {number === 0 && <h1>Select Suggestions</h1>}
            {resultsArray}
        </div>
    )
}