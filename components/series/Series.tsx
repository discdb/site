import Link from "next/link";
import { SeriesType } from "../types/Series";

export const Series = ({
	original_name,
	overview,
	first_air_date,
	id,
}: SeriesType) => {
	return (
		<Link href={`/series/${id}`}>
			<div>
				<div>
					<b>{original_name} </b>({first_air_date})
				</div>
				<div>{overview}</div>
				<br />
			</div>
		</Link>
	);
};
