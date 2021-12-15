import { GetStaticProps } from "next";
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

const SeriesList = ({ series }) => {
	return (
		<div>
			{series.map((show: SeriesType, key: number) => {
				return (
					<motion.div
						key={key}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={{
							hidden: {
								scale: 0.7,
								opacity: 0,
							},
							visible: {
								scale: 1,
								opacity: 1,
								transition: {
									delay: 0.01,
								},
							},
						}}
					>
						<Series {...show} />
					</motion.div>
				);
			})}
		</div>
	);
};

export default SeriesList;
