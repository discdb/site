import styles from "./MediaPage.module.css";

const MediaPage = () => {
	const toggleTab = (tab: string) => {};
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
				<div className={styles.tabs}>
					<ul>
						<li id="active" className={styles.active}>
							<a key="1">DVD</a>
						</li>
						<li>
							<a key="2">Blu-ray</a>
						</li>
					</ul>
					<p id="panes">
						<div key="tab-1" id="active" className={styles.active}>
							fuck
						</div>
						<div key="tab-2">shit</div>
					</p>
				</div>
				<div className={styles.notes}>Notes notes</div>
				<div className={styles.extras}>Extras extras</div>
			</div>
		</div>
	);
};

export default MediaPage;
