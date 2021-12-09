import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPostFromAPI } from "../../components/blog/getPost";
import { getPostsFromAPI } from "../../components/blog/getPostsFromAPI";
import { Post } from "../../components/blog/PostPage";

export const getStaticPaths = async () => {
	const posts = await getPostsFromAPI();
	const paths = posts.map((post: any) => ({
		params: { postId: post.identifier },
	}));

	return { paths, fallback: true };
};
export const getStaticProps = async ({ params }) => {
	const { postId } = params;

	if (!postId) {
		return { props: {}, notFound: true };
	}
	const post = await getPostFromAPI(postId);

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
			<Post {...post} />
		</div>
	);
};
export default ViewPost;
