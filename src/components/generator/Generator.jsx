import Action from "./Action";
import Filter from "./Filter";
import Tab from "./Tab";

export default function Generator(props) {
    const {className} = props;
    return (
        <div className={className}>
            <h1> Suggestion Generator</h1>
            <Filter props={props}/>
            <Action />
        </div>
    )
}