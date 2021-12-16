import styles from "./CreatePage.module.css";

export const CreatePage = () => {
	return (
		<div id={styles.createForm}>
			<div className="header-2" style={{ textAlign: "center" }}>
				Create Post
			</div>
			<form>
				<label htmlFor="title">
					<div className={styles.label}>Title</div>
					<input id={styles.input} name="title" type="text" />
				</label>
				<label htmlFor="body">
					<div className={styles.label}>Body</div>
					<textarea id={styles.input} name="body" rows={24} />
				</label>
				<div className={styles.underBody}>
					<a href="https://www.markdownguide.org/basic-syntax/">
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
