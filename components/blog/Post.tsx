import { BlogPost } from "../types/Post";
import Link from "next/link";
import styles from "./Post.module.css";

export const Post = ({
	title,
	image = "https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png",
	body,
	identifier,
}: BlogPost) => {
	return (
		<Link href={`/blog/${identifier}`}>
			<div id={styles.post}>
				<div>
					<div className={styles.newsLeft}>
						<img src={image} alt="" />
					</div>
					<div className={styles.newsRight}>
						<div className={styles.title}>{title}</div>
						<div className={styles.body}>{body}</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
