import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { slide as BurgerMenu } from "react-burger-menu";

import styles from "./Menu.module.css";

export const Menu = () => {
	const session = useSession();
	const currentUser = session[0]?.user;

	const [open, setOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = () => setOpen(false);
		router.events.on("routeChangeStart", handleRouteChange);
		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, []);

	const authenticatedOptions = (
		<div>
			<a>
				<div
					onClick={() => {
						signOut();
					}}
					className={styles.menuItem}
				>
					Logout
				</div>
			</a>
		</div>
	);
	const unauthenticatedOptions = (
		<div>
			<Link href="/login">
				<a>
					<div className={styles.menuItem + " noselect"}>Login</div>
				</a>
			</Link>
			<Link href="/register">
				<a>
					<div className={styles.menuItem + " noselect"}>
						Register
					</div>
				</a>
			</Link>
		</div>
	);
	return (
		<BurgerMenu
			right
			isOpen={open}
			disableAutoFocus
			onStateChange={({ isOpen }) => {
				document.documentElement.style.overflowY = isOpen
					? "hidden"
					: "";

				setOpen(isOpen);
			}}
		>
			{currentUser ? authenticatedOptions : unauthenticatedOptions}
		</BurgerMenu>
	);
};
