import SingleResult from "./SingleResult"

const mockData = [
    {name: "A"},
    {name: "B"},
    {name: "C"}
]

export default function Results(props) {

    return (

        <div className="results">
            {mockData.map((entry) => {
                return <SingleResult name={entry.name}/>
            })}
        </div>
    )
}