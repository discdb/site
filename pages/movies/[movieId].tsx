import { GetStaticProps, GetStaticPaths } from "next";

import { MovieType } from "../../components/types/Movie";
import { Movie } from "../../components/tmdb/movies/Movies";
import { getMovieFromAPI } from "../../components/tmdb/movies/getMovieFromAPI";

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [];
	return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { movieId } = params;
	const movie: MovieType = await getMovieFromAPI(movieId.toString());

	return {
		props: {
			movie,
		},
	};
};

const ViewMovie = ({ movie }) => {
	return (
		<div>
			<Movie {...movie} />
		</div>
	);
};

export default ViewMovie;
