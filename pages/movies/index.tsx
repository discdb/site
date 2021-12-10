import { GetStaticProps } from "next";

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
		<div>
			{movies.map((movie: MovieType, key: number) => {
				return <Movie key={key} {...movie} />;
			})}
		</div>
	);
};

export default movieList;
