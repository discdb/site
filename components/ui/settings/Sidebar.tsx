import styles from "./Sidebar.module.css";
import { toggleTab } from "./toggleTab";
export const Sidebar = () => {
	return (
		<ul id={styles.sideBar}>
			<li onClick={() => toggleTab("account")} className="noselect">
				Account
			</li>
			<li onClick={() => toggleTab("security")} className="noselect">
				Security
			</li>
		</ul>
	);
};
