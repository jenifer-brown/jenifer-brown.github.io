
export default function Action(props) {
    const { handleSubmit} = props;

    const [numResults, setNumResults] = React.useState(0);
    const actionType = props.generatorType;
    return (
        <>
        <button onClick={() => setNumResults(1)}>Single Suggestion</button>
        <button onClick={() => setNumResults(10)}>Choose 10</button>
        <br/>
        <button onClick={() => handleSubmit(numResults)}>Submit</button>
        </>
    );
}