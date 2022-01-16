import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

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
					<Link href="/" passHref>
						<li className="noselect">Home</li>
					</Link>
					<Link href="/about" passHref>
						<li className="noselect">About</li>
					</Link>
					<Link href="/blog" passHref>
						<li className="noselect">Blog</li>
					</Link>
					<Link href="/guides" passHref>
						<li className="noselect">Guides</li>
					</Link>
					<Link href="/media" passHref>
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
				<Link href="/login" passHref>
					<div id="auth" className="noselect">
						<span className="link">Login</span>
					</div>
				</Link>
			)}
		</header>
	);
};
