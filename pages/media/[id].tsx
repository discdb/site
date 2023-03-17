import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const MediaPage: NextPage = () => {
	const {
		query: { id }
	} = useRouter();

	return <>{id}</>;
};

export default MediaPage;
