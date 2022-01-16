import Image from "next/image";
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
		<Link href={`/movies/${id}`} passHref>
			<div id={styles.movie}>
				<div
					className={styles.posterContainer}
					style={{
						position: "relative",
					}}
				>
					<Image
						src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`}
						objectFit="cover"
						layout="fill"
						alt="Poster"
					/>
				</div>

				<div id={styles.below}>
					<div id={styles.title}>
						<b>{title || original_title} </b>
					</div>
					<div>
						({release_date?.toString().substring(0, 4) || "null"})
					</div>
					<div id={styles.overview}>{overview}</div>
				</div>
			</div>
		</Link>
	);
};
