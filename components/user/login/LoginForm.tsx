import Link from "next/link";

import styles from "./LoginForm.module.css";
import { loginUser } from "./Login";
import { signIn } from "next-auth/react";

interface Props {
	providers: JSON;
	referer: string;
}

export const LoginForm = ({ providers, referer }: Props) => {
	return (
		<div id={styles.loginForm}>
			<h2>
				<span>Welcome</span> back!
			</h2>
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
				<input
					id={styles.input}
					name="email"
					type="email"
					placeholder="Email"
					required
				/>
				<br />
				<br />
				<input
					id={styles.input}
					name="password"
					type="password"
					placeholder="Password"
					required
				/>
				<br />
				<br />
				<br />
				<button id={styles.loginButton} type="submit">
					Login
				</button>
				<div className={styles.or}>OR</div>
				{providers && Object.values(providers).map((provider) => {
					return (
						<div key={provider.name}>
							<button
								onClick={() =>
									signIn(provider.id, {
										callbackUrl: referer,
									})
								}
							>
								Login with {provider.name}
							</button>
						</div>
					);
				})}
				<div id={styles.newUserLink}>
					<Link href="/register">New User?</Link>
				</div>
			</form>
		</div>
	);
};
