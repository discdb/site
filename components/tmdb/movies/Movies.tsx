import Link from "next/link";
import { MovieType } from "../../types/Movie";
import styles from "./Movies.module.css";

export const Movie = ({
	original_title,
	title,
	overview,
	release_date,
	poster_path,
	id,
}: MovieType) => {
	return (
		<Link href={`/movies/${id}`}>
			<div id={styles.movie}>
				<img
					style={{ maxWidth: "100%", borderRadius: "5px" }}
					src={`https://www.themoviedb.org/t/p/w1280/${poster_path}`}
				/>
				<div>
					<div>
						<b>{title || original_title} </b>
					</div>
					<div>({release_date})</div>
					<div id={styles.overview}>{overview}</div>
				</div>
			</div>
		</Link>
	);
};
