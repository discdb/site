import Link from "next/link";

export const Footer = () => {
	return (
		<footer>
			<div>
				<div className="noselect footer-title">
					<Link href="/">dvdb</Link>
				</div>
				<div className="footer-column">
					<div className="footer-header noselect">Information</div>
					<div className="footer-body">
						<ul>
							<li>
								<Link href="/about">About</Link>
							</li>
							<li>
								<Link href="/discord">Discord</Link>
							</li>
							<li>
								<Link href="/faq">FAQ</Link>
							</li>
							<li>
								<Link href="/privacy-policy">
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};
