import { useRouter } from "next/router";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import { getPostFromAPI } from "../../components/blog/getPost";
import { getPostsFromAPI } from "../../components/blog/getPostsFromAPI";
import { Post } from "../../components/blog/PostPage";
import { BlogPost } from "../../components/types/Post";

export const getStaticPaths: GetStaticPaths = async () => {
	const posts: BlogPost[] = await getPostsFromAPI();
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
	const post: BlogPost = await getPostFromAPI(postId);

	return post
		? {
				props: {
					post: JSON.parse(JSON.stringify(post)),
				},
				revalidate: 10,
		  }
		: { props: {}, notFound: true };
};

const ViewPost = ({ post }) => {
	const { isFallback } = useRouter();

	return isFallback ? (
		<div>Loading..</div>
	) : (
		<div>
			<Head>
				<title>{post.title}</title>
				<meta content={post.body} name="og:description" />
				<meta
					content={post.title + " by " + post.createdBy}
					property="og:title"
				/>
			</Head>
			<Post {...post} />
		</div>
	);
};
export default ViewPost;
