import Link from "next/link";
import { signIn } from "next-auth/react";

import { loginUser } from "./Login";
import styles from "./LoginForm.module.css";

interface Props {
	providers: JSON;
	referer: string;
}

export const LoginForm = ({ providers, referer }: Props) => {
	const setDisabled = () => {
		const button = document.getElementById("loginButton");
		button.setAttribute("disabled", "disabled");
	};

	const formSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const email = target.email.value;
		const password = target.password.value;
		loginUser({ email, password });
		setDisabled();
	};

	return (
		<div id={styles.loginForm}>
			<h2>
				<span>Welcome</span> back!
			</h2>
			<form onSubmit={formSubmit}>
				<input
					id={styles.input}
					name="email"
					type="email"
					placeholder="Email"
					maxLength={128}
					required
				/>
				<br />
				<br />
				<input
					id={styles.input}
					name="password"
					type="password"
					placeholder="Password"
					maxLength={64}
					required
				/>
				<br />
				<br />
				<br />
				<button id="loginButton" type="submit">
					Login
				</button>
				<div className={styles.or}>OR</div>
				{providers &&
					Object.values(providers).map((provider) => {
						return (
							provider.name != "Login" && (
								<button
									key={provider.name}
									id={styles.loginButton}
									onClick={() =>
										signIn(provider.id, {
											callbackUrl: referer,
										})
									}
								>
									Login with {provider.name}
								</button>
							)
						);
					})}
				<div id={styles.newUserLink}>
					<Link href="/register">New User?</Link>
				</div>
			</form>
		</div>
	);
};
