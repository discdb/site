import { NextPage, GetStaticProps } from "next";
import { motion } from "framer-motion";

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

interface Props {
	series: Readonly<SeriesType[]>;
}

const SeriesList: NextPage<Props> = ({ series }) => {
	return (
		<>
			<div className="posterGrid">
				{series.map((show: SeriesType, key: number) => {
					return (
						<motion.div
							key={key}
							initial="hidden"
							animate="visible"
							whileHover="enlarge"
							variants={{
								hidden: {
									scale: 0.7,
									opacity: 0,
								},
								visible: {
									scale: 1,
									opacity: 1,
									transition: {
										delay: key / 20,
									},
								},
								enlarge: {
									scale: 1.075,
								},
							}}
						>
							<Series {...show} />
						</motion.div>
					);
				})}
			</div>
		</>
	);
};

export default SeriesList;
