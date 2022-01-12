import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import { getPostsFromAPI } from "../../components/blog/getPostsFromAPI";
import { Post } from "../../components/blog/Post";
import { BlogPost } from "../../components/types/Post";
import AddIcon from "@mui/icons-material/Add";

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
	const session = useSession();

	useEffect(() => {
		getPostsFromAPI(20, 1)
			.then((res) => {
				setPosts(res);
			})
			.catch((err) => setError("Error fetching posts"));
	}, []);

	return (
		<>
			<h1>The Blog</h1>
			{session?.status == "authenticated" && (
				<Link href="/blog/create">
					<a className="addIconContainer" title="Create Post">
						<button className="addIcon">
							<AddIcon fontSize="medium" />
						</button>
					</a>
				</Link>
			)}
			<div id="postList">
				{error ? (
					<span style={{ color: "red" }}>{error}</span>
				) : posts.length > 0 ? (
					posts.map((post, index) => (
						<MappedPost post={post} key={index} index={index} />
						// <Post {...post} key={index} />
					))
				) : (
					<div className="loading"></div>
				)}
			</div>
		</>
	);
};
export default Blog;
