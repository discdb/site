import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { slide as BurgerMenu } from "react-burger-menu";

import styles from "./Menu.module.css";

export const Menu = () => {
	const session = useSession();

	const [open, setOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = () => setOpen(false);
		router.events.on("routeChangeStart", handleRouteChange);
		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, []);

	const blogOption = (
		<div>
			<div className={styles.menuHeader}>Blog</div>
			<Link href="/blog/create">
				<a className="noselect">
					<div className={styles.menuItem}>Create Post</div>
				</a>
			</Link>
		</div>
	);
	const authenticatedOptions = (
		<div>
			<div className={styles.menuHeader}>Browse</div>
			<Link href="/blog">
				<a className="noselect">
					<div className={styles.menuItem}>Blog</div>
				</a>
			</Link>
			<Link href="/discs">
				<a className="noselect">
					<div className={styles.menuItem}>Discs</div>
				</a>
			</Link>
			<Link href="/movies">
				<a className="noselect">
					<div className={styles.menuItem}>Movies</div>
				</a>
			</Link>
			<Link href="/series">
				<a className="noselect">
					<div className={styles.menuItem}>Series</div>
				</a>
			</Link>
			<div className={styles.menuHeader}>Other</div>
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
		<span>
			<Link href="/login">
				<a className="noselect">
					<div className={styles.menuItem}>Login</div>
				</a>
			</Link>
			<Link href="/register">
				<a className="noselect">
					<div className={styles.menuItem}>Register</div>
				</a>
			</Link>
		</span>
	);
	return (
		<BurgerMenu
			isOpen={open}
			disableAutoFocus
			onStateChange={({ isOpen }) => {
				// document.documentElement.style.overflowY = isOpen
				// 	? "hidden"
				// 	: "";

				setOpen(isOpen);
			}}
		>
			{/* {true ? blogOption : ""} */}
			{session.status == "authenticated"
				? authenticatedOptions
				: unauthenticatedOptions}
		</BurgerMenu>
	);
};
