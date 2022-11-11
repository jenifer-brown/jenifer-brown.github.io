import Action from "./Action";
import Filter from "./Filter";
import Tab from "./Tab";

export default function Generator(props) {
    return (
        <>
        <h1> Suggestion Generator</h1>
        <Tab/>
        <Filter props={props}/>
        <Action />
        </>
    )
}