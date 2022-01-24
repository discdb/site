import Images from "./Images";
import styles from "./MediaPage.module.css";
import Tabs from "./Tabs";

const MediaPage = () => {
	return (
		<div id={styles.mediaPage}>
			<div className={styles.images}>
				<Images />
			</div>
			<div className={styles.information}>
				<h3 className="noselect">Information</h3>
				Licensor: Disney
				<br />
				Distributor: Disney
				<br />
				Release Date: 2016-12-18
				<br />
				MSRP: USD $399.69
				<br />
				UPC: 7809239130102
				<br />
				EAN 0239193213829
				<br />
			</div>
			<div className={styles.title}>
				<h2>Princess Mononoke</h2>
				<div>Studio Ghibli Collection</div>
			</div>
			<div className={styles.tabs}>
				<Tabs />
			</div>
			<div className={styles.notes}>
				<h3 className="noselect">Notes</h3>
				<p>notey notes</p>
			</div>
			<div className={styles.extras}>
				<h3 className="noselect">Extras</h3>
				<p>extras extras</p>
			</div>
		</div>
	);
};

export default MediaPage;
