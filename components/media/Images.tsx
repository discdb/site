import styles from "./Images.module.css";

const Images = () => {
	const changeImage = ({ target: image }) => {
		const expandedImage = document.getElementById(
			"expandedImage"
		) as HTMLImageElement;
		expandedImage.src = image.src;
	};
	return (
		<div className={styles.imagesParent}>
			<div className={styles.imageContainer}>
				<img
					src="https://images.static-bluray.com/movies/covers/184140_large.jpg?t=1500573567"
					id="expandedImage"
					style={{ width: "100%" }}
				/>
			</div>
			<div className={styles.imageRow}>
				<div className={styles.imageColumn}>
					<img
						src="https://images.static-bluray.com/movies/covers/184140_large.jpg?t=1500573567"
						alt="No pictures available."
						className="noselect"
						onClick={changeImage}
					/>
				</div>
				<div className={styles.imageColumn}>
					<img
						src="https://images.static-bluray.com/movies/covers/184140_back.jpg?t=1518496462"
						alt="No pictures available."
						className="noselect"
						onClick={changeImage}
					/>
				</div>
				<div className={styles.imageColumn}>
					<img
						src="https://images.static-bluray.com/movies/covers/184140_slip.jpg?t=1504287012"
						alt="No pictures available."
						className="noselect"
						onClick={changeImage}
					/>
				</div>
			</div>
		</div>
	);
};

export default Images;
