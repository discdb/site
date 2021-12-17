import { useState } from "react";
import { NextPage } from "next";
import { motion } from "framer-motion";

import { searchSeries } from "../../components/tmdb/series/searchSeries";
import { SeriesType } from "../../components/types/Series";
import { Series } from "../../components/tmdb/series/Series";
import { SearchBox } from "../../components/tmdb/SearchBox";

const Search: NextPage = () => {
	const [results, setResults] = useState([]);

	const getResults = (query: string) => {
		searchSeries(query).then((x) => {
			setResults(x);
		});
	};

	return (
		<>
			<div className="header">Search</div>
			<SearchBox getResults={getResults} />
			<div className="posterGrid">
				{results
					? results.map((show: SeriesType, key: number) => {
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
									<Series {...show} />
								</motion.div>
							);
					  })
					: "Loading..."}
			</div>
		</>
	);
};
export default Search;
