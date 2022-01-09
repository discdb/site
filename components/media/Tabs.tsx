import styles from "./Tabs.module.css";
import { toggleTab } from "./toggleTab";
const Tabs = () => {
	return (
		<div id="mediaTabs" className={styles.tabs}>
			<ul>
				<li id="active" className={styles.active} onClick={toggleTab}>
					<a key="1">DVD</a>
				</li>
				<li onClick={toggleTab}>
					<a key="2">Blu-ray</a>
				</li>
			</ul>
			<div id="tab-panes">
				<div key="tab-1" id="active" className={styles.active}>
					fuck
				</div>
				<div key="tab-2">shit</div>
			</div>
		</div>
	);
};

export default Tabs;
