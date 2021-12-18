import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getPostsFromAPI } from "../components/blog/getPostsFromAPI";
import { Post } from "../components/blog/Post";
import { BlogPost } from "../components/types/Post";

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

const Home: NextPage = () => {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		getPostsFromAPI()
			.then((res) => {
				setPosts(res);
			})
			.catch((err) => setError("Error fetching posts"));
	}, []);

	return (
		<>
			<div id="about-us">
				<div className="header-2">What is dvdb?</div>
				<div
					className="after-header"
					style={{ fontSize: "var(--size-2)" }}
				>
					<p>
						Sed ut perspiciatis unde omnis iste natus error sit
						voluptatem accusantium doloremque laudantium, totam rem
						aperiam, eaque ipsa quae ab illo inventore veritatis et
						quasi architecto beatae vitae dicta sunt explicabo. Nemo
						enim ipsam voluptatem quia voluptas sit aspernatur aut
						odit aut fugit, sed quia consequuntur magni dolores eos
						qui ratione voluptatem sequi nesciunt. Neque porro
						quisquam est, qui dolorem ipsum quia dolor sit amet,
						consectetur, adipisci velit, sed quia non numquam eius
						modi tempora incidunt ut labore et dolore magnam aliquam
						quaerat voluptatem. Ut enim ad minima veniam, quis
						nostrum exercitationem ullam corporis suscipit
						laboriosam, nisi ut aliquid ex ea commodi consequatur?
						Quis autem vel eum iure reprehenderit qui in ea
						voluptate velit esse quam nihil molestiae consequatur,
						vel illum qui dolorem eum fugiat quo voluptas nulla
						pariatur?
						<span id="link">
							<Link href="/about-us">Learn More</Link>
						</span>
					</p>
				</div>
			</div>
			<div className="header">Recent Blog Posts</div>
			<div id="postList" className="after-header">
				{!error ? (
					posts.map((post, index) => (
						<MappedPost post={post} index={index} />
					))
				) : (
					<span style={{ color: "red" }}>{error}</span>
				)}
			</div>
			<div className="header">Recent Additions</div>
			<div className="after-header"></div>
		</>
	);
};

export default Home;
