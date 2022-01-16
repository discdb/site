import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { createPost } from "./createPost";
import styles from "./CreatePage.module.css";

export const CreatePage = () => {
	const router = useRouter();
	const {
		data: { user },
	} = useSession();

	return (
		<div id={styles.createForm}>
			<form
				onSubmit={(e: React.SyntheticEvent) => {
					e.preventDefault();
					const target = e.target as typeof e.target & {
						title: { value: string };
						body: { value: string };
					};
					const title = target.title.value;
					const body = target.body.value;
					createPost(
						title,
						body,
						(user?.name as string) || (user?.username as string)
					).then((post) => {
						router.push(`/blog/${post.identifier}`);
					});
				}}
			>
				<label htmlFor="title">
					<div className={styles.label}>Title</div>
					<input
						id={styles.input}
						name="title"
						type="text"
						placeholder="Title"
						required
					/>
				</label>
				<label htmlFor="body">
					<div className={styles.label}>Body</div>
					<textarea
						id={styles.input}
						name="body"
						rows={16}
						placeholder="Body"
						required
					/>
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
					Publish!
				</button>
			</form>
		</div>
	);
};
