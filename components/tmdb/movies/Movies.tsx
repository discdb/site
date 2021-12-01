import Link from "next/link";
import { MovieType } from "../../types/Movie";
import styles from "./Movies.module.css";

export const Movie = ({
	original_title,
	title,
	overview,
	release_date,
	id,
}: MovieType) => {
	return (
		<Link href={`/movies/${id}`}>
			<div id={styles.movie}>
				<div>
					<b>{title || original_title} </b>({release_date})
				</div>
				<div>{overview}</div>
				<br />
			</div>
		</Link>
	);
};
