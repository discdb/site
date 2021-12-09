// import { BlogPost } from "../types/Post";
import styles from "./PostPage.module.css";
import ReactMarkdown from "react-markdown";
import { PostPage } from "../types/Post";

export const Post = ({ title, body }: PostPage) => {
	return (
		<div id={styles.postPage}>
			<div id={styles.backDrop}>
				<h1>{title}</h1>
			</div>
			<main>
				<div id={styles.postDetails}>
					<div>October 12th 2021</div>
					<div>By Alli</div>
					<div>2 Comments</div>
				</div>
				<br />
				<ReactMarkdown skipHtml={true}>{body}</ReactMarkdown>
			</main>
		</div>
	);
};
