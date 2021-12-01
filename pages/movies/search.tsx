import { useState } from "react";
import { searchMovies } from "../../components/tmdb/movies/searchMovies";
import { MovieType } from "../../components/types/Movie";
import { Movie } from "../../components/tmdb/movies/Movies";
import { SearchBox } from "../../components/tmdb/SearchBox";

const Search = () => {
	const [results, setResults] = useState([]);

	const getResults = (query: string) => {
		searchMovies(query).then((x) => {
			setResults(x);
		});
	};

	return (
		<div>
			<div className="header">Search</div>
			<SearchBox getResults={getResults} />
			{results
				? results.map((show: MovieType, key: number) => {
						return <Movie key={key} {...show} />;
				  })
				: "Loading..."}
		</div>
	);
};
export default Search;
