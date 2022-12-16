export default function Filter(props) {
	const { getFilters } = props;

	const { type } = props;

	return (
		<>
			<label>Decade</label>
			<select
				onChange={(e) => getFilters(e, "decade")}
				id="decade"
				name="decade"
				value={props.decade}
			>
				<option value={undefined}>none</option>
				<option value="2020">2020</option>
				<option value="2010">2010</option>
				<option value="2000">2000</option>
				<option value="1990">1990</option>
				<option value="1980">1980</option>
				<option value="1970">1970</option>
				<option value="1960">1960</option>
				<option value="1950">1950</option>
				<option value="1940">1940</option>
			</select>
			<br />
			{type !== "books" && (
				<div>
					<label>Genre</label>
					<select
						onChange={(e) => getFilters(e, "genre")}
						id="genre"
						name="genre"
						value={props.genre}
					>
						<option value={undefined}>none</option>
						<option value="10749">Romance</option>
						<option value="28">Action</option>
						<option value="35">Comedy</option>
						<option value="53">Thriller</option>
						<option value="27">Horror</option>
						<option value="18">Drama</option>
					</select>
				</div>
			)}
			<br />
			{type === "movies" && (
				<div>
					<label>Max Runtime</label>
					<input
						type="range"
						min="10"
						step="10"
						max="180"
						id="runtime"
						className="runtime"
						onInput={(e) => props.getFilters(e, "runtime")}
						onChangeCapture={(e) => props.getFilters(e, "runtime")}
						value={props.runtime}
					/>
					<label> {props.runtime ? props.runtime : ""} mins</label>
				</div>
			)}
		</>
	);
}
