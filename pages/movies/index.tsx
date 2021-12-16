import { GetStaticProps } from "next";
import { motion } from "framer-motion";

import { getMoviesList } from "../../components/tmdb/movies/getMoviesList";
import { Movie } from "../../components/tmdb/movies/Movies";
import { MovieType } from "../../components/types/Movie";

export const getStaticProps: GetStaticProps = async () => {
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

const movieList = ({ movies }) => {
	return (
		<div className="posterGrid">
			{movies.map((movie: MovieType, key: number) => {
				return (
					<motion.div
						key={key}
						initial="hidden"
						whileInView="visible"
						whileHover="enlarge"
						viewport={{ once: true }}
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
