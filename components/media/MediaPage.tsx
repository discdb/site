import styles from "./MediaPage.module.css";
import Tabs from "./Tabs";

const MediaPage = () => {
	const toggleTab = (e: any) => {
		const panes = document.getElementById("panes");
	};
	return (
		<div id={styles.mediaPage}>
			<div id={styles.leftContainer}>
				<div className={styles.images}>
					<img src="" alt="No pictures available." />
					{/* <img src="" alt="No pictures available." />

				<img src="" alt="No pictures available." /> */}
				</div>
			</div>
			<div id={styles.rightContainer}>
				<div className={styles.title}>
					<h2>Princess Mononoke</h2>
					<div>Studio Ghibli Collection</div>
				</div>
				<Tabs />
				<div className={styles.notes}>Notes notes</div>
				<div className={styles.extras}>Extras extras</div>
			</div>
		</div>
	);
};

export default MediaPage;
