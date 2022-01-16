/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styles from "./Tabs.module.css";
import { toggleTab } from "./toggleTab";
const Tabs = () => {
	return (
		<div id="mediaTabs" className={styles.tabs}>
			<ul>
				<li
					id="active"
					value="1"
					className={styles.active}
					onClick={toggleTab}
				>
					<a className="noselect">DVD</a>
				</li>
				<li value="2" onClick={toggleTab}>
					<a className="noselect">Blu-ray</a>
				</li>
			</ul>
			<div id="mediaPanes">
				<div id="1">duck</div>
				<div id="2" className="hidden">
					shit
				</div>
			</div>
		</div>
	);
};

export default Tabs;
