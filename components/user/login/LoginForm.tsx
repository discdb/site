import Link from "next/link";

import styles from "./index.module.css";
import { loginUser } from "./Login";

export const LoginForm = () => {
	return (
		<div id={styles.loginForm}>
			<div className="header" style={{ textAlign: "center" }}>
				Login
			</div>

			<form
				onSubmit={(e: React.SyntheticEvent) => {
					e.preventDefault();
					const target = e.target as typeof e.target & {
						email: { value: string };
						password: { value: string };
					};
					const email = target.email.value;
					const password = target.password.value;
					loginUser({ email, password });
				}}
			>
				<label htmlFor="email">
					<div className={styles.label}>Email</div>
					<input id={styles.input} name="email" type="email" />
				</label>
				<br />
				<br />
				<label htmlFor="password">
					<div className={styles.label}>Password</div>
					<input id={styles.input} name="password" type="password" />
				</label>
				<div id={styles.forgotPasswordLink}>
					<Link href="/forgot-password">Forgot Password?</Link>
				</div>
				<br />
				<button id={styles.loginButton} type="submit">
					Login
				</button>
			</form>
		</div>
	);
};
