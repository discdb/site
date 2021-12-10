import { GetStaticProps } from "next";

import { getSeriesList } from "../../components/tmdb/series/getSeriesList";
import { Series } from "../../components/tmdb/series/Series";
import { SeriesType } from "../../components/types/Series";

export const getStaticProps: GetStaticProps = async () => {
	const series: SeriesType[] = await getSeriesList();

	return series
		? {
				props: {
					series: JSON.parse(JSON.stringify(series)),
				},
				revalidate: 360,
		  }
		: { props: {}, notFound: true };
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
