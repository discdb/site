import Link from "next/link";
import moment from "moment";
import removeMd from "remove-markdown";

import { BlogPost } from "../types/Post";
import styles from "./Post.module.css";

export const Post = ({
	title,
	image = "https://www.teahub.io/photos/full/21-211456_blur-gaussian.jpg",
	body,
	createdAt,
	identifier,
}: BlogPost) => {
	return (
		<Link href={`/blog/${identifier}`}>
			<div id={styles.post}>
				<img src={image} className="image" />
				<div id="info" className={styles.info}>
					<div className={styles.date}>
						{moment(createdAt).format("MMMM Do, YYYY")}
					</div>
					<div className="title">{title}</div>
					<div id="post-body" className={styles.body}>
						{removeMd(body)}
					</div>
				</div>
			</div>
		</Link>
	);
};
