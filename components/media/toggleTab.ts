export const toggleTab = ({ currentTarget: newlySelected }) => {
	const previouslySelected = document.querySelector("#mediaTabs ul #active");
	previouslySelected.id = "";

	newlySelected.id = "active";
	// const new
};
