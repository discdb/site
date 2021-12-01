import { GetServerSideProps } from "next";

import { getMoviesList } from "../../components/tmdb/movies/getMoviesList";
import { Movie } from "../../components/tmdb/movies/Movies";
import { MovieType } from "../../components/types/Movie";

export const getServerSideProps: GetServerSideProps = async () => {
	const movie: MovieType[] = await getMoviesList();

	return {
		props: {
			movie,
		},
	};
};

const movieList = ({ movie }) => {
	return (
		<div>
			{movie.map((show: MovieType, key: number) => {
				return <Movie key={key} {...show} />;
			})}
		</div>
	);
};

export default movieList;
