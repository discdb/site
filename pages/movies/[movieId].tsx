import { NextPage, GetStaticProps, GetStaticPaths } from "next";
// import Head from "next/head";

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

interface Props {
	movie: MovieType;
}

const ViewMovie: NextPage<Props> = ({ movie }) => {
	return (
		<>
			{/* <Head>
				<title>{movie.title || movie.original_title}</title>
				<meta content={movie.title || movie.original_title} property="og:title" />
				<meta content={movie.overview} property="og:description" />
				<meta
					content={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
					property="og:image"
				/>
			</Head> */}
			<MoviePage {...movie} />
		</>
	);
};

export default ViewMovie;
