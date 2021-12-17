import styles from "./SearchBox.module.css";

export const SearchBox = ({ getResults }) => {
	const removeCooldown = () => {
		const button = document.getElementById("searchButton");
		button.removeAttribute("disabled");
	};

	const setCooldown = () => {
		const button = document.getElementById("searchButton");
		button.setAttribute("disabled", "disabled");
		setTimeout(() => removeCooldown(), 2000);
	};

	return (
		<form
			id={styles.searchForm}
			onSubmit={(e: React.SyntheticEvent) => {
				e.preventDefault();
				setCooldown();
				const target = e.target as typeof e.target & {
					query: { value: string };
				};
				const query = target.query.value;
				getResults(query);
			}}
		>
			<input id={styles.searchBox} type="text" name="query" />
			<button
				id="searchButton"
				className={styles.searchButton}
				type="submit"
			>
				Search!
			</button>
		</form>
	);
};
