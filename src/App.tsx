import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/nav";
import { Footer } from "./components/Footer";
import { Home } from "./views/home";
import { Blog } from "./views/blog";
import { Discs } from "./views/discs";
import { Login } from "./views/login";
import { Register } from "./views/register";
import { NotFound } from "./components/NotFound";

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<Home />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/discs" element={<Discs />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
