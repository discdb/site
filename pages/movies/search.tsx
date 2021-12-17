import { useState } from "react";
import { motion } from "framer-motion";

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
		<>
			<div className="header">Search</div>
			<SearchBox getResults={getResults} />
			{results
				? results.map((movie: MovieType, key: number) => {
						return (
							<motion.div
								key={key}
								initial="hidden"
								animate="visible"
								variants={{
									hidden: {
										scale: 0.7,
										opacity: 0,
									},
									visible: {
										scale: 1,
										opacity: 1,
										transition: {
											delay: key / 10,
										},
									},
								}}
							>
								<Movie {...movie} />
							</motion.div>
						);
				  })
				: "Loading..."}
		</>
	);
};
export default Search;
