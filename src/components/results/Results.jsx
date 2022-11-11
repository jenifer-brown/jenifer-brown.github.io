import SingleResult from "./SingleResult"

export default function Results(props) {
    React.useEffect(() => {
        showResults();
    })

    function showResults() {
        const results = document.querySelector(".results");
        for (let i = 0; i < 2; i++) {
            results.append(<SingleResult number={i + 1}/>)
        }
        return results;
    }
    return (
        <div className="results"></div>
    )
}