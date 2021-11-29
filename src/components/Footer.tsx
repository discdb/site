import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<div id="footer">
			<div className="noselect">dvdb</div>
			<div>
				<Link to="/about-us">About Us</Link>
			</div>
			<div>
				<a href="https://discord.gg/HkvcwnHStn">Discord</a>
			</div>
			<div>
				<Link to="/faq">FAQ</Link>
			</div>
			<div>
				<Link to="/terms-of-service">Terms Of Service </Link>
			</div>
			<div>
				<Link to="/privacy-policy">Privacy Policy</Link>
			</div>
		</div>
	);
};
