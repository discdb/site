import { BlogPost } from "../types/Post";
import Link from "next/link";
import styles from "./Post.module.css";

export const Post = ({ title, image, description, id }: BlogPost) => {
	return (
		<Link href={`/blog/${id}`}>
			<div id={styles.post}>
				<div>
					<div className={styles.newsLeft}>
						<img src={image} alt="" />
					</div>
					<div className={styles.newsRight}>
						<div className={styles.title}>{title}</div>
						<div className={styles.description}>{description}</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
