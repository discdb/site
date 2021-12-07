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
				<label htmlFor="description">
					<div className={styles.label}>Description</div>
					<textarea id={styles.input} name="description" rows={24} />
				</label>
				<div className={styles.underDescription}>
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
