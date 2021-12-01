import { searchSeries } from "./searchSeries";
import styles from "./SearchBox.module.css";

export const SearchBox = ({ getResults }) => {
	const removeCooldown = () => {
		const button = document.getElementById("searchButton");
		button.removeAttribute("disabled");
	};

	const setCooldown = (ev: any) => {
		const button = ev.target;
		button.setAttribute("disabled", "disabled");
		setTimeout(() => removeCooldown(), 2000);
	};

	return (
		<form
			onSubmit={(e: React.SyntheticEvent) => {
				e.preventDefault();
				const target = e.target as typeof e.target & {
					query: { value: string };
				};
				const query = target.query.value;

				searchSeries(query).then((x) => {
					getResults(x);
				});
			}}
		>
			<input id={styles.searchBox} type="text" name="query" />
			<button
				id="searchButton"
				className={styles.searchButton}
				onClick={(ev) => setCooldown(ev)}
				type="submit"
			>
				Search!
			</button>
		</form>
	);
};
