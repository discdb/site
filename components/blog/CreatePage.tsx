import styles from "./CreatePage.module.css";
import { createPost } from "./createPost";

export const CreatePage = () => {
	return (
		<div id={styles.createForm}>
			<div className="header-2" style={{ textAlign: "center" }}>
				Create Post
			</div>
			<form
				onSubmit={(e: React.SyntheticEvent) => {
					e.preventDefault();
					const target = e.target as typeof e.target & {
						title: { value: string };
						body: { value: string };
					};
					const title = target.title.value;
					const body = target.body.value;
					createPost(title, body);
				}}
			>
				<label htmlFor="title">
					<div className={styles.label}>Title</div>
					<input id={styles.input} name="title" type="text" />
				</label>
				<label htmlFor="body">
					<div className={styles.label}>Body</div>
					<textarea id={styles.input} name="body" rows={24} />
				</label>
				<div className={styles.underBody}>
					<a
						href="https://www.markdownguide.org/basic-syntax/"
						target="_blank"
					>
						Supports Markdown!
					</a>
				</div>
				<button id={styles.createButton} type="submit">
					Create Post
				</button>
			</form>
		</div>
	);
};
