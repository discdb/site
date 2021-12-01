import { useEffect, useState } from "react";
import { searchSeries } from "../../components/series/searchSeries";
import { SeriesType } from "../../components/types/Series";
import { Series } from "../../components/series/Series";
import { SearchBox } from "../../components/series/SearchBox";

const Search = () => {
	const [results, setResults] = useState([]);

	const getResults = (data) => {
		setResults(data);
	};

	return (
		<div>
			<div className="header">Search</div>
			<SearchBox getResults={getResults} />
			{results
				? results.map((show: SeriesType, key: number) => {
						return <Series key={key} {...show} />;
				  })
				: "Loading..."}
		</div>
	);
};
export default Search;
