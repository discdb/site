import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { getSeriesFromAPI } from "../../components/tmdb/series/getSeriesFromAPI";
import { SeriesPage } from "../../components/tmdb/series/SeriesPage";
import { SeriesType } from "../../components/types/Series";

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
	return (
		<>
			{/* <Head>
				<title>{series.name || series.original_name}</title>
				<meta content={series.name || series.original_name} property="og:title" />
				<meta content={series.overview} property="og:description" />
				<meta
					content={`https://www.themoviedb.org/t/p/w440_and_h660_face/${series.poster_path}`}
					property="og:image"
				/>
			</Head> */}
			<SeriesPage {...series} />
		</>
	);
};

export default ViewSeries;
