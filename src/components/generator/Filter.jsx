
export default function Filter(props) {
    const { getFilters } = props;
    
    const {type} = props;

    return (
        <>
        <label>Decade</label>
        <select onChange={(e) => getFilters(e, "decade")} id="decade" name="decade">
            <option value="1990">1990</option>
            <option value="2000">2000</option>
            <option value="2010">2010</option>
            <option value="2020">2020</option> 
        </select>
        <br/>
        <label>Genre</label>
        <select onChange={(e) => getFilters(e, "genre")} id="genre" name="genre">
            <option value="romance">Romance</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option> 
        </select>
        <br/>

        {type === "movies" && 
        <div>
            <label>Runtime</label>
            <input type="range" min="10" max="240" id="runtime" className="runtime"/>
        </div>
        }
        </>
    )
}