import { signOut, useSession } from "next-auth/react";

import Link from "next/link";

export const Header = () => {
	const session = useSession();

	return (
		<div id="navbar">
			<div id="title">
				<Link href="/">dvdb</Link>
			</div>
			<div id="nav-items">
				<ul>
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
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
			{session.status == "authenticated" ? (
				<div id="auth" onClick={() => signOut()}>
					<span className="link">Logout</span>
				</div>
			) : (
				<Link href="/login">
					<div id="auth">
						<span className="link">Login</span>
					</div>
				</Link>
			)}
		</div>
	);
};
