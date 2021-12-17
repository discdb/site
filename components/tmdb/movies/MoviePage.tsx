import Image from "next/image";

import { MovieType } from "../../types/Movie";
import styles from "./MoviePage.module.css";

export const MoviePage = ({
	original_title,
	title,
	overview,
	release_date,
	poster_path,
	id,
}: MovieType) => {
	return (
		<div id={styles.seriesContainer}>
			<div id={styles.leftContainer}>
				<Image
					width={"250px"}
					height={"375px"}
					src={`https://www.themoviedb.org/t/p/w1280/${poster_path}`}
				/>
			</div>
			<div id={styles.rightContainer}>
				<h1>
					{title || original_title} (
					{release_date?.toString().substring(0, 4)})
				</h1>
				<div>{overview}</div>
				<br />
			</div>
		</div>
	);
};
