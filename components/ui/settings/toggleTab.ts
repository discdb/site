export const toggleTab = (tab: string) => {
	const selected = document.querySelector("#panes > div:not(.hidden)");
	const newTab = document.querySelector(`#panes #${tab}`);

	selected.classList.add("hidden");
	newTab.classList.remove("hidden");
};
