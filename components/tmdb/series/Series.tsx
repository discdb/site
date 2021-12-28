import Link from "next/link";
import Image from "next/image";

import { SeriesType } from "../../types/Series";
import styles from "./Series.module.css";

export const Series = ({
	original_name,
	name,
	overview,
	first_air_date,
	poster_path,
	id,
}: SeriesType) => {
	return (
		<Link href={`/series/${id}`}>
			<div id={styles.series}>
				{/* <Image
					width={180.4}
					height={273}
					layout={"responsive"}
				
				/> */}
				<img
					alt={"No image!"}
					src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`}
				/>
				<div id={styles.below}>
					<div id={styles.title}>
						<b>{name || original_name} </b>
					</div>
					<div id={styles.date}>
						({first_air_date?.toString().substring(0, 4) || "null"})
					</div>
					<div id={styles.overview}>{overview}</div>
				</div>
			</div>
		</Link>
	);
};
