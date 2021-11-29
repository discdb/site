import { getSeriesFromAPI } from "../../components/series/getSeriesFromAPI";

export const getServerSideProps = async ({ params }) => {
	const { seriesId } = params;

	const series = await getSeriesFromAPI(seriesId);

	return {
		props: {
			series: JSON.parse(JSON.stringify(series)),
		},
	};
};

const ViewSeries = ({ series }) => {
	console.log(series);
	return <div></div>;
};

export default ViewSeries;
