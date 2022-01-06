import styles from "./index.module.css";
import { registerUser } from "./Register";

export const RegisterForm = () => {
	return (
		<div id={styles.registerForm}>
			<div className="header" style={{ textAlign: "center" }}>
				Register
			</div>

			<form
				onSubmit={(e: React.SyntheticEvent) => {
					e.preventDefault();
					const target = e.target as typeof e.target & {
						email: { value: string };
						password: { value: string };
						fullName: { value: string };
						username: { value: string };
					};
					const email = target.email.value;
					const password = target.password.value;
					const fullName = target.fullName.value;
					const username = target.username.value;
					registerUser({ email, password, fullName, username });
				}}
			>
				<label htmlFor="name">
					<div className={styles.label}>Name</div>
					<input
						id={styles.input}
						name="fullName"
						type="text"
						maxLength={64}
						required
					/>
				</label>
				<br />
				<br />
				<label htmlFor="username">
					<div className={styles.label}>Username</div>
					<input
						id={styles.input}
						name="username"
						type="text"
						maxLength={16}
						required
					/>
				</label>
				<br />
				<br />
				<label htmlFor="email">
					<div className={styles.label}>Email</div>
					<input
						id={styles.input}
						name="email"
						type="email"
						maxLength={128}
						required
					/>
				</label>
				<br />
				<br />
				<label htmlFor="password">
					<div className={styles.label}>Password</div>
					<input
						id={styles.input}
						name="password"
						type="password"
						maxLength={64}
						required
					/>
				</label>
				<br />
				<br />
				<label htmlFor="password">
					<div className={styles.label}>Re-Enter Password</div>
					<input
						id={styles.input}
						type="password"
						maxLength={64}
						disabled
					/>
				</label>
				<br />
				<br />

				<button id={styles.registerButton} type="submit">
					Register
				</button>
			</form>
		</div>
	);
};
