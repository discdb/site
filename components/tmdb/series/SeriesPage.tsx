import Image from "next/image";

import { SeriesType } from "../../types/Series";
import styles from "./SeriesPage.module.css";

export const SeriesPage = ({
	original_name,
	name,
	overview,
	first_air_date,
	poster_path,
}: SeriesType) => {
	return (
		<div id={styles.seriesContainer}>
			<div id={styles.leftContainer}>
				<Image
					width={"250px"}
					height={"375px"}
					alt="Poster"
					src={`https://www.themoviedb.org/t/p/w1280/${poster_path}`}
				/>
			</div>
			<div id={styles.rightContainer}>
				<h1>
					{name || original_name} (
					{first_air_date?.toString().substring(0, 4)})
				</h1>
				<div>{overview}</div>
				<br />
			</div>
		</div>
	);
};
