import { NextPage, GetStaticProps, GetStaticPaths } from "next";

import { SeriesType } from "../../components/types/Series";
import { getSeriesFromAPI } from "../../components/tmdb/series/getSeriesFromAPI";
import { SeriesPage } from "../../components/tmdb/series/SeriesPage";

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

interface Props {
	series: SeriesType;
}

const ViewSeries: NextPage<Props> = ({ series }) => {
	return <SeriesPage {...series} />;
};

export default ViewSeries;
