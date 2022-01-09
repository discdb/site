import styles from "./MediaPage.module.css";
import Tabs from "./Tabs";
import Images from "./Images";
const MediaPage = () => {
	return (
		<div id={styles.mediaPage}>
			<div id={styles.leftContainer}>
				<Images />
			</div>
			<div id={styles.rightContainer}>
				<div className={styles.title}>
					<h2>Princess Mononoke</h2>
					<div>Studio Ghibli Collection</div>
				</div>
				<Tabs />
				<div className={styles.notes}>
					<h3>Notes</h3>
					<p>notey notes</p>
				</div>
				<div className={styles.extras}>
					<h3>Extras</h3>
					<p>extras extras</p>
				</div>
			</div>
		</div>
	);
};

export default MediaPage;
