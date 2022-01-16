import moment from "moment";
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
			<img src={image} id={styles.backDrop} />
			<h1>{title}</h1>
			<article>
				<div id={styles.postDetails}>
					<div>{moment(createdAt).format("MMMM Do, YYYY")}</div>
					<div>By {createdBy}</div>
					<div>0 Comments</div>
				</div>
				<br />
				<ReactMarkdown skipHtml={true} disallowedElements={["script"]}>
					{body}
				</ReactMarkdown>
			</article>
		</div>
	);
};
