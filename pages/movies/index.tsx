import { NextPage, GetStaticProps } from "next";
import { motion } from "framer-motion";

import { getMoviesList } from "../../components/tmdb/movies/getMoviesList";
import { Movie } from "../../components/tmdb/movies/Movies";
import { MovieType } from "../../components/types/Movie";
import Link from "next/link";
import { LOCAL_API_URL } from "../../helpers/api";
import { useState } from "react";

export const getStaticProps: GetStaticProps = async (ctx) => {
	const movies: MovieType[] = await getMoviesList();
	return movies
		? {
				props: {
					movies: JSON.parse(JSON.stringify(movies)),
				},
				revalidate: 360,
		  }
		: { props: {}, notFound: true };
};

interface Props {
	movies: MovieType[];
}

const movieList: NextPage<Props> = ({ movies }) => {
	const [page, setPage] = useState(2);
	const [movieList, setMovieList] = useState(movies);
	const loadMore = async () => {
		setPage((page) => page + 1);
		console.log(page);
		const response = await fetch(
			`${LOCAL_API_URL}/movies/get?page=${page}`
		);

		const { results } = await response.json();
		const newPage = results.map(
			({
				original_title,
				title,
				overview,
				release_date,
				poster_path,
				id,
			}) => {
				return {
					original_title,
					title,
					overview,
					release_date,
					poster_path,
					id,
				};
			}
		);

		setMovieList((oldMovies) => [...oldMovies, ...newPage]);
	};

	return (
		<>
			<div className="posterGrid">
				{movieList.map((movie: MovieType, key: number) => {
					return (
						<motion.div
							key={key}
							initial="hidden"
							animate="visible"
							whileHover="enlarge"
							variants={{
								hidden: {
									scale: 0.7,
									opacity: 0,
								},
								visible: {
									scale: 1,
									opacity: 1,
									transition: {
										delay: key / 20, //0.01,
									},
								},
								enlarge: {
									scale: 1.075,
								},
							}}
						>
							<Movie {...movie} />
						</motion.div>
					);
				})}
			</div>
			<motion.div
				id="loadMore"
				onClick={loadMore}
				whileHover="enlarge"
				style={{ cursor: "pointer" }}
				variants={{
					enlarge: {
						scale: 1.1,
					},
				}}
			>
				Load more..
			</motion.div>
		</>
	);
};

export default movieList;
