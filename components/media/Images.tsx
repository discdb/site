import Image from "next/image";
import { useState } from "react";

import styles from "./Images.module.css";

const Images = () => {
	const [expandedImage, setExpanded] = useState(
		"https://images.static-bluray.com/movies/covers/184140_large.jpg?t=1500573567"
	);
	const changeImage = ({ target: image }) => {
		setExpanded(image.src);
	};
	return (
		<div className={styles.imagesParent}>
			<div className={styles.imageContainer}>
				<Image
					src={expandedImage}
					objectFit="contain"
					layout="fill"
					id="expandedImage"
					alt="Image"
				/>
			</div>
			<div className={styles.imageRow}>
				<div
					className={styles.imageColumn}
					onClick={changeImage}
					role="img"
					aria-hidden
				>
					<Image
						src="https://images.static-bluray.com/movies/covers/184140_large.jpg?t=1500573567"
						objectFit="contain"
						layout="fill"
						className="noselect"
						alt="No pictures available."
					/>
				</div>
				<div
					className={styles.imageColumn}
					onClick={changeImage}
					role="img"
					aria-hidden
				>
					<Image
						src="https://images.static-bluray.com/movies/covers/184140_back.jpg?t=1518496462"
						objectFit="contain"
						layout="fill"
						className="noselect"
						alt="No pictures available."
					/>
				</div>
				<div
					className={styles.imageColumn}
					onClick={changeImage}
					role="img"
					aria-hidden
				>
					<Image
						src="https://images.static-bluray.com/movies/covers/184140_slip.jpg?t=1504287012"
						objectFit="contain"
						layout="fill"
						className="noselect"
						alt="No pictures available."
					/>
				</div>
			</div>
		</div>
	);
};

export default Images;
