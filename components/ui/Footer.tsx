import Link from "next/link";

export const Footer = () => {
	return (
		<footer>
			<div>
				<div className="noselect footer-title">
					<Link href="/">dvdb</Link>
				</div>
				<div className="footer-flex">
					<div className="footer-column">
						<div className="footer-header noselect">
							The Project
						</div>
						<div className="footer-body">
							<ul>
								<li>
									<Link href="/blog">Blog</Link>
								</li>
								<li>
									<Link href="/guides">Guides</Link>
								</li>
								<li>
									<Link href="/media">Media</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="footer-column">
						<div className="footer-header noselect">The Group</div>
						<div className="footer-body">
							<ul>
								<li>
									<Link href="/about">About</Link>
								</li>
								<li>
									<Link href="mailto:noreply@dvdb.video">
										Contact
									</Link>
								</li>
								<li>
									<Link href="https://github.com/allilk/discdb">
										Github
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="footer-column">
						<div className="footer-header noselect">Resources</div>
						<div className="footer-body">
							<ul>
								<li>
									<Link href="/faq">FAQ</Link>
								</li>
								<li>
									<Link href="/discord">Discord</Link>
								</li>
								<li>
									<Link href="/disclaimer">Disclaimer</Link>
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
			</div>
		</footer>
	);
};
