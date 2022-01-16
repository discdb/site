import styles from "./Sidebar.module.css";
import { toggleTab } from "./toggleTab";

export const Sidebar = () => {
	return (
		<div id={styles.sideBar}>
			<div
				onClick={() => toggleTab("account")}
				className="noselect"
				role="button"
				tabIndex={0}
				aria-hidden
			>
				Account
			</div>
			<div
				onClick={() => toggleTab("security")}
				className="noselect"
				role="button"
				tabIndex={0}
				aria-hidden
			>
				Security
			</div>
		</div>
	);
};
