import { NextPage, GetStaticProps } from "next";
import { motion } from "framer-motion";

import { getMoviesList } from "../../components/tmdb/movies/getMoviesList";
import { Movie } from "../../components/tmdb/movies/Movies";
import { MovieType } from "../../components/types/Movie";

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
	movies: Readonly<MovieType[]>;
}

const movieList: NextPage<Props> = ({ movies }) => {
	return (
		<div className="posterGrid">
			{movies.map((movie: MovieType, key: number) => {
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
	);
};

export default movieList;
