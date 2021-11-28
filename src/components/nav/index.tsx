import { Link } from "react-router-dom";
import "./index.css";

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
				<div>
					<Link to="/login">
						<div className="nav-item">Login</div>
					</Link>
					<Link to="/register">
						<div className="nav-item">Register</div>
					</Link>
				</div>
			</div>
		</div>
	);
};
