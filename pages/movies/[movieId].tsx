import { GetStaticProps, GetStaticPaths } from "next";

import { MovieType } from "../../components/types/Movie";
import { getMovieFromAPI } from "../../components/tmdb/movies/getMovieFromAPI";
import { MoviePage } from "../../components/tmdb/movies/MoviePage";

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [];
	return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { movieId } = params;
	const movie: MovieType = await getMovieFromAPI(movieId.toString());

	return {
		props: {
			movie,
		},
		revalidate: 360,
	};
};

const ViewMovie = ({ movie }) => {
	return <MoviePage {...movie} />;
};

export default ViewMovie;
