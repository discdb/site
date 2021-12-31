export const toggleTab = (tab: string) => {
	let selected = document.querySelector("#panes > div:not(.hidden)");
	let newTab = document.querySelector(`#panes #${tab}`);

	selected.classList.add("hidden");
	newTab.classList.remove("hidden");
};
