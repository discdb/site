import Link from "next/link";
import styles from "./index.module.css";
import { getCurrentUser } from "../user/getCurrentUser";

export const Header = () => {
	const currentUser = getCurrentUser();
	return (
		<div>
			<title>dvdb</title>
			<div id={styles.nav}>
				<Link href="/">
					<div id="title" className={styles.noselect}>
						dvdb
					</div>
				</Link>
				<div>
					<Link href="/blog">
						<div className={styles.navItem}>Blog</div>
					</Link>
					<Link href="/forum">
						<div className={styles.navItem}>Forum</div>
					</Link>
					<Link href="/discs">
						<div className={styles.navItem}>Discs</div>
					</Link>
				</div>
				<div style={{ float: "right", marginRight: "1.5rem" }}>
					{!currentUser ? (
						<div>
							<Link href="/login">
								<div className={styles.navItem}>Login</div>
							</Link>
							<Link href="/register">
								<div className={styles.navItem}>Register</div>
							</Link>
						</div>
					) : (
						<div>
							<Link href="/logout">
								<div className={styles.navItem}>Logout</div>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
