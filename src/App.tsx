import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/nav";
import { Footer } from "./components/Footer";
import { Blog } from "./views/blog";
import { Home } from "./views/home";
const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/blog" element={<Blog />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
