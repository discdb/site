export const toggleTab = ({ currentTarget: newlySelected }) => {
	const previouslySelected = document.querySelector("#mediaTabs ul #active");
	previouslySelected.id = "";
	newlySelected.id = "active";

	const previouslySelectedPane = document.querySelector(
		"#mediaPanes  :not(.hidden)"
	);
	previouslySelectedPane.classList.add("hidden");

	const newlySelectedPane = document.querySelector(`#mediaPanes`).childNodes[
		newlySelected.value - 1
	] as HTMLElement;

	newlySelectedPane.classList.remove("hidden");
};
