import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

import styles from "./ErrorBar.module.css";

const ErrorBar = ({ message, clearError }) => {
	useEffect(() => {
		const error = document.getElementById("error");
		error.scrollIntoView();
	}, []);

	return (
		<div id="error" className={styles.errorBar}>
			{message}
			<CloseIcon onClick={clearError} />
		</div>
	);
};

export default ErrorBar;
