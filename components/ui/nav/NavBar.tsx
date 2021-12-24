import { signOut, useSession } from "next-auth/react";

import Link from "next/link";

export const Header = () => {
	const session = useSession();

	return (
		<header id="navbar">
			<div id="title" className="noselect">
				<Link href="/">dvdb</Link>
			</div>
			<div id="nav-items">
				<ul>
					<li className="noselect">
						<Link href="/">Home</Link>
					</li>
					<li className="noselect">
						<Link href="/about">About</Link>
					</li>
					<li className="noselect">
						<Link href="/blog">Blog</Link>
					</li>
					<li className="noselect">
						<Link href="/guides">Guides</Link>
					</li>
					<li className="noselect">
						<Link href="/media">Media</Link>
					</li>
				</ul>
			</div>
			{session.status == "authenticated" ? (
				<div id="auth" className="noselect" onClick={() => signOut()}>
					<span className="link ">Logout</span>
				</div>
			) : (
				<Link href="/login">
					<div id="auth" className="noselect">
						<span className="link">Login</span>
					</div>
				</Link>
			)}
		</header>
	);
};
