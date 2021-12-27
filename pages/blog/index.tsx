import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getPostsFromAPI } from "../../components/blog/getPostsFromAPI";
import { Post } from "../../components/blog/Post";
import { BlogPost } from "../../components/types/Post";

const MappedPost = ({ index, post }: { index: number; post: BlogPost }) => {
	return (
		<>
			<motion.div
				key={index}
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {
						scale: 0.7,
						opacity: 0,
					},
					visible: {
						scale: 1,
						opacity: 1,
						transition: {
							delay: index / 10,
						},
					},
				}}
			>
				<Post {...post} />
			</motion.div>
		</>
	);
};

const Blog: NextPage = () => {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		getPostsFromAPI(20, 1)
			.then((res) => {
				setPosts(res);
			})
			.catch((err) => setError("Error fetching posts"));
	}, []);

	return (
		<>
			<h1>Blog</h1>
			<div id="postList">
				{!error ? (
					posts.map((post, index) => (
						<MappedPost post={post} key={index} index={index} />
					))
				) : (
					<span style={{ color: "red" }}>{error}</span>
				)}
			</div>
		</>
	);
};
export default Blog;
