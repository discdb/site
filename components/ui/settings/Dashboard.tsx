import { AccountOptions } from "./Account";
import { SecurityOptions } from "./Security";
import { Sidebar } from "./Sidebar";

export const Dashboard = () => {
	return (
		<div id="dashboard">
			<Sidebar />
			{/* Panes */}
			<div id="panes">
				<AccountOptions />
				<SecurityOptions />
			</div>
		</div>
	);
};
