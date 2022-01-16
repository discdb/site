import { motion } from "framer-motion";
import { useState } from "react";

import { Movie } from "../../components/tmdb/movies/Movies";
import { searchMovies } from "../../components/tmdb/movies/searchMovies";
import { SearchBox } from "../../components/tmdb/SearchBox";
import { MovieType } from "../../components/types/Movie";

const Search = () => {
	const [results, setResults] = useState([]);
	const [error, setError] = useState("");

	const getResults = (query: string) => {
		searchMovies(query)
			.then((x) => {
				setResults(x);
			})
			.catch((err) => setError(err));
	};

	return (
		<>
			<div className="header">Search</div>
			<SearchBox getResults={getResults} />
			<div className="posterGrid">
				{!error ? (
					results.map((movie: MovieType, key: number) => {
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
				) : (
					<span style={{ color: "red" }}>{error}</span>
				)}
			</div>
		</>
	);
};
export default Search;
