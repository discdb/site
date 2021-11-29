import { getSeriesList } from "../../components/series/getSeriesList";
import { Series } from "../../components/series/Series";
import { SeriesType } from "../../components/types/Series";

export const getServerSideProps = async () => {
	const series = await getSeriesList();

	return {
		props: {
			series: JSON.parse(JSON.stringify(series)),
		},
	};
};

const SeriesList = ({ series }) => {
	return (
		<div>
			{series.map((show: SeriesType, key) => {
				return <Series key={key} {...show} />;
			})}
		</div>
	);
};

export default SeriesList;
