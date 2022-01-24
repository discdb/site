import moment from "moment";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { PostPage } from "../types/Post";
import styles from "./PostPage.module.css";

export const Post = ({
	title,
	image = "https://www.teahub.io/photos/full/21-211456_blur-gaussian.jpg",
	body,
	createdAt,
	createdBy,
}: PostPage) => {
	return (
		<div id={styles.postPage}>
			<div className={styles.backDropContainer}>
				<Image
					id={styles.backDrop}
					src={image}
					layout="fill"
					objectFit="fill"
					alt="No Image Available."
				/>
			</div>
			<h1>{title}</h1>
			<article>
				<div id={styles.postDetails}>
					<div>{moment(createdAt).format("MMMM Do, YYYY")}</div>
					<div>By {createdBy}</div>
					<div>0 Comments</div>
				</div>
				<br />
				<ReactMarkdown skipHtml={true} disallowedElements={["script", "iframe", "meta"]}>
					{body}
				</ReactMarkdown>
			</article>
		</div>
	);
};
