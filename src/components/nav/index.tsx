import * as React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<div>
			<title>discdb</title>
			<div id="nav">
				<Link to="/">
					<div id="title">discdb</div>
				</Link>
				<div>
					<Link to="/blog">
						<div className="nav-item">Blog</div>
					</Link>
					<Link to="/forum">
						<div className="nav-item">Forum</div>
					</Link>
					<Link to="/discs">
						<div className="nav-item">Discs</div>
					</Link>
				</div>
			</div>
		</div>
	);
};
