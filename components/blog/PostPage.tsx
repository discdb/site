import ReactMarkdown from "react-markdown";
import moment from "moment";

import styles from "./PostPage.module.css";

import { PostPage } from "../types/Post";

export const Post = ({ title, body, createdAt, createdBy }: PostPage) => {
	return (
		<div id={styles.postPage}>
			<div id={styles.backDrop}>
				<h1>{title}</h1>
			</div>
			<main>
				<div id={styles.postDetails}>
					<div>{moment(createdAt).format("MMMM Do, YYYY")}</div>
					<div>By {createdBy}</div>
					<div>0 Comments</div>
				</div>
				<br />
				<ReactMarkdown skipHtml={true}>{body}</ReactMarkdown>
			</main>
		</div>
	);
};
