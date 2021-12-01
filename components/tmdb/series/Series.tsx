import Link from "next/link";
import { SeriesType } from "../../types/Series";
import styles from "./Series.module.css";

export const Series = ({
	original_name,
	name,
	overview,
	first_air_date,
	id,
}: SeriesType) => {
	return (
		<Link href={`/series/${id}`}>
			<div id={styles.series}>
				<div>
					<b>{name || original_name} </b>({first_air_date})
				</div>
				<div>{overview}</div>
				<br />
			</div>
		</Link>
	);
};
