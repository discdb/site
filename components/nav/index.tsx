import Link from "next/link";
import styles from "./index.module.css";
import { signOut } from "next-auth/client";
import { useSession } from "next-auth/client";

export const Header = () => {
	const session = useSession();
	const currentUser = session[0]?.user;

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
						<a>
							<div className={styles.navItem}>Blog</div>
						</a>
					</Link>
					<Link href="/forum">
						<a>
							<div className={styles.navItem}>Forum</div>
						</a>
					</Link>
					<Link href="/discs">
						<a>
							<div className={styles.navItem}>Discs</div>
						</a>
					</Link>
				</div>
				<div style={{ float: "right", marginRight: "1.5rem" }}>
					{!currentUser ? (
						<div>
							<Link href="/login">
								<a>
									<div className={styles.navItem}>Login</div>
								</a>
							</Link>
							<Link href="/register">
								<a>
									<div className={styles.navItem}>
										Register
									</div>
								</a>
							</Link>
						</div>
					) : (
						<div>
							<div
								onClick={() => {
									signOut();
								}}
								className={styles.navItem}
							>
								Logout
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
