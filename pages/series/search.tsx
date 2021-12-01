import { useState } from "react";
import { searchSeries } from "../../components/tmdb/series/searchSeries";
import { SeriesType } from "../../components/types/Series";
import { Series } from "../../components/tmdb/series/Series";
import { SearchBox } from "../../components/tmdb/SearchBox";

const Search = () => {
	const [results, setResults] = useState([]);

	const getResults = (query: string) => {
		searchSeries(query).then((x) => {
			setResults(x);
		});
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
