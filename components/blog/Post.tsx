import { BlogPost } from "../types/Post";
import Link from "next/link";
import styles from "./Post.module.css";
import { useEffect } from "react";

export const Post = ({
	title,
	image = "https://www.teahub.io/photos/full/21-211456_blur-gaussian.jpg",
	body,
	identifier,
}: BlogPost) => {
	return (
		<Link href={`/blog/${identifier}`}>
			<div id={styles.post}>
				<img src={image} className="image" />
				<div id="info" className={styles.info}>
					<div className={styles.date}>January 1st, 2022</div>
					<div className="title">{title}</div>
					<div className={styles.body}>{body}</div>
				</div>
			</div>
		</Link>
	);
};
