
const TabTypes = {
    Books: "Books",
    Movies: "Movies",
    Shows: "Shows"
}

export default function Tab(props) {

    const { type, handleClick } = props;

    const className = type + "-tab";

    const buttonTitle = React.useMemo(() => {
        switch (type) {
            case (TabTypes.Books.toLowerCase()):
                return TabTypes.Books;
            case (TabTypes.Movies.toLowerCase()):
                return TabTypes.Movies;
            case (TabTypes.Shows.toLowerCase()):
                return TabTypes.Shows;
            default:
                return "";
        }
    }, []);

    return (
        <>
        <button className={className} onClick={handleClick}>{buttonTitle}</button>
        </>
    )
}