import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Menu } from "./Menu";

export const Header = () => {
	const session = useSession();
	const router = useRouter();

	return (
		<header id="navbar">
			<Menu />
			<div id="title" className="noselect">
				<Link href="/">dvdb</Link>
			</div>
			<div id="nav-items">
				<ul>
					<Link href="/">
						<li className="noselect">Home</li>
					</Link>
					<Link href="/about">
						<li className="noselect">About</li>
					</Link>
					<Link href="/blog">
						<li className="noselect">Blog</li>
					</Link>
					<Link href="/guides">
						<li className="noselect">Guides</li>
					</Link>
					<Link href="/media">
						<li className="noselect">Media</li>
					</Link>
				</ul>
			</div>
			{session.status == "authenticated" ? (
				<div
					id="auth"
					className="noselect"
					onClick={() =>
						signOut({
							callbackUrl: `${router.asPath}`,
						})
					}
				>
					<span className="link">Logout</span>
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
