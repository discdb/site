import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/nav";
import { Blog } from "./views/blog";

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Blog />} />
			</Routes>
		</Router>
	);
};

export default App;
