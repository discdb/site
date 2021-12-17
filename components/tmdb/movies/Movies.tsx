import Link from "next/link";
import Image from "next/image";

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
				<Image
					width={180.4}
					height={273}
					src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`}
				/>
				<div id={styles.below}>
					<div id={styles.title}>
						<b>{title || original_title} </b>
					</div>
					<div>({release_date?.toString().substring(0, 4)})</div>
					<div id={styles.overview}>{overview}</div>
				</div>
			</div>
		</Link>
	);
};
