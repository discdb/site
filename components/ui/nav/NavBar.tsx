import Link from "next/link";
import styles from "./NavBar.module.css";
import { Menu } from "./Menu";

export const Header = () => {
	return (
		<div>
			<title>dvdb</title>
			<div id={styles.nav}>
				<Link href="/">
					<div id="title" className="noselect">
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
			</div>
			<Menu />
		</div>
	);
};
