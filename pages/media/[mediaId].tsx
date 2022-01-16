import { NextPage } from "next";

// import { getMediaFromAPI } from "../../components/media/getMediaFromAPI";
// import { getMediaListFromAPI } from "../../components/media/getMediaListFromAPI";
import MediaPage from "../../components/media/MediaPage";
// import { MediaType } from "../../components/types/Media";

// export const getStaticPaths: GetStaticPaths = async () => {
// 	const mediaArr: MediaType[] = await getMediaListFromAPI();
// 	const paths = mediaArr.map((media: any) => ({
// 		params: { mediaId: media.identifier },
// 	}));

// 	return { paths, fallback: true };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
// 	const { mediaId } = params;

// 	if (!mediaId) {
// 		return { props: {}, notFound: true };
// 	}
// 	// const media: MediaType = await getMediaFromAPI(mediaId);

// 	return media
// 		? {
// 				props: {
// 					media: JSON.parse(JSON.stringify(media)),
// 				},
// 				revalidate: 3600,
// 		  }
// 		: { props: {}, notFound: true };
// };

// interface Props {
// 	media: MediaType;
// }

const Media: NextPage = () => {
	return (
		<>
			<MediaPage />
		</>
	);
};
export default Media;
