import { GetStaticProps, GetStaticPaths } from "next";

import { MovieType } from "../../components/types/Movie";
import { getMovieFromAPI } from "../../components/tmdb/movies/getMovieFromAPI";
import { MoviePage } from "../../components/tmdb/movies/MoviePage";

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
			<MoviePage {...movie} />
		</div>
	);
};

export default ViewMovie;
