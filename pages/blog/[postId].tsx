import { useRouter } from "next/router";
import Head from "next/head";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";

import { getPostFromAPI } from "../../components/blog/getPost";
import { getPostsFromAPI } from "../../components/blog/getPostsFromAPI";
import { Post } from "../../components/blog/PostPage";
import { PostPage } from "../../components/types/Post";

export const getStaticPaths: GetStaticPaths = async () => {
	const posts: PostPage[] = await getPostsFromAPI();
	const paths = posts.map((post: any) => ({
		params: { postId: post.identifier },
	}));

	return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { postId } = params;

	if (!postId) {
		return { props: {}, notFound: true };
	}
	const post: PostPage = await getPostFromAPI(postId);

	return post
		? {
				props: {
					post: JSON.parse(JSON.stringify(post)),
				},
				revalidate: 3600,
		  }
		: { props: {}, notFound: true };
};

interface Props {
	post: PostPage;
}

const ViewPost: NextPage<Props> = ({ post }) => {
	const { isFallback } = useRouter();

	return isFallback ? (
		<>Loading..</>
	) : (
		<>
			<Head>
				<title>{post.title}</title>
				<meta content={post.body} name="og:description" />
				<meta
					content={post.title + " by " + post.createdBy}
					property="og:title"
				/>
			</Head>
			<Post {...post} />
		</>
	);
};
export default ViewPost;
