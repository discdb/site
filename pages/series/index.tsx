import { GetServerSideProps } from "next";

import { getSeriesList } from "../../components/series/getSeriesList";
import { Series } from "../../components/series/Series";
import { SeriesType } from "../../components/types/Series";

export const getServerSideProps: GetServerSideProps = async () => {
	const series: SeriesType[] = await getSeriesList();

	return {
		props: {
			series,
		},
	};
};

const SeriesList = ({ series }) => {
	return (
		<div>
			{series.map((show: SeriesType, key: number) => {
				return <Series key={key} {...show} />;
			})}
		</div>
	);
};

export default SeriesList;
