import Link from "next/link";

export const Footer = () => {
	return (
		<footer>
			<div>
				<div className="noselect">
					<Link href="/">dvdb</Link>
				</div>
				<div>
					<Link href="/about-us">About Us</Link>
				</div>
				<div>
					<a href="https://discord.gg/HkvcwnHStn">Discord</a>
				</div>
				<div>
					<Link href="/faq">FAQ</Link>
				</div>
				<div>
					<Link href="/privacy-policy">Privacy Policy</Link>
				</div>
			</div>
		</footer>
	);
};
