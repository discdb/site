import { GetStaticProps, GetStaticPaths } from "next";

import { SeriesType } from "../../components/types/Series";
import { Series } from "../../components/tmdb/series/Series";
import { getSeriesFromAPI } from "../../components/tmdb/series/getSeriesFromAPI";

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [];
	return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { seriesId } = params;
	const series: SeriesType = await getSeriesFromAPI(seriesId.toString());

	return {
		props: {
			series,
		},
	};
};

const ViewSeries = ({ series }) => {
	return (
		<div>
			<Series {...series} />
		</div>
	);
};

export default ViewSeries;
