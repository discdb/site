import { useState } from "react";
// import isEmail from "validator/lib/isEmail";

import { registerUser } from "./Register";

import ErrorBar from "../../ui/error/ErrorBar";
import styles from "./RegisterForm.module.css";

export const RegisterForm = () => {
	const [error, setError] = useState();

	const removeDisabled = () => {
		const button = document.getElementById("registerButton");
		button.removeAttribute("disabled");
		setError(null);
	};

	const setDisabled = () => {
		const button = document.getElementById("registerButton");
		button.setAttribute("disabled", "disabled");
	};

	const formSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setDisabled();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
			name: { value: string };
			username: { value: string };
		};
		const email = target.email.value;
		const password = target.password.value;
		const name = target.name.value;
		const username = target.username.value;
		registerUser({ email, password, name, username }).catch((err) =>
			setError(err)
		);
	};

	return (
		<>
			{error && (
				<ErrorBar message={error} clearError={() => setError(null)} />
			)}
			<div id={styles.registerForm}>
				<h2>
					<span>Get</span> started
				</h2>
				<form onSubmit={formSubmit}>
					<input
						id={styles.input}
						name="name"
						type="text"
						placeholder="Name"
						maxLength={64}
					/>
					<br />
					<br />
					<input
						id={styles.input}
						name="username"
						type="text"
						maxLength={16}
						onChange={error && removeDisabled}
						placeholder="Username"
						required
					/>
					<br />
					<br />
					<input
						id={styles.input}
						name="email"
						type="email"
						maxLength={128}
						placeholder="Email"
						onChange={error && removeDisabled}
						required
					/>
					<br />
					<br />
					<input
						id={styles.input}
						name="password"
						type="password"
						maxLength={64}
						placeholder="Password"
						required
					/>
					<br />
					<br />
					<button id="registerButton" type="submit">
						Register
					</button>
				</form>
			</div>
		</>
	);
};
