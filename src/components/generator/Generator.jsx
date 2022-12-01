import Action from "./Action";
import Filter from "./Filter";
import Tab from "./Tab";

export default function Generator(props) {
    const {className, generatorType, handleNumberClick} = props;

    const typeTitle = React.useMemo(() => {
        switch (generatorType){
            case "books":
                return "Book";
                break;
            case "movies":
                return "Movie";
                break;
            case "shows":
                return "TV Show";
                break;
            default:
                return "";
        }
    }, [generatorType]);

    return (
        <div className={className}>
            <h1>{typeTitle} Suggestion Generator</h1>
            {!typeTitle && <h1>What kind of suggestion would you like?</h1>}
            {typeTitle &&
            <>
            <Filter 
                type={generatorType}
                getFilters={props.getFilters}
            />
            <Action 
                handleNumberClick={handleNumberClick}
                handleSubmit={props.handleSubmit}
            />
            </> 
            }
        </div>
    )
}