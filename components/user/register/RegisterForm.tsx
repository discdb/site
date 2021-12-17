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
					};
					const email = target.email.value;
					const password = target.password.value;
					registerUser({ email, password });
				}}
			>
				<label htmlFor="name">
					<div className={styles.label}>Name</div>
					<input id={styles.input} name="name" type="text" />
				</label>
				<br />
				<br />
				<label htmlFor="username">
					<div className={styles.label}>Username</div>
					<input id={styles.input} name="username" type="text" />
				</label>
				<br />
				<br />
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
				<br />
				<br />
				<label htmlFor="password">
					<div className={styles.label}>Re-Enter Password</div>
					<input id={styles.input} type="password" disabled />
				</label>
				<br />
				<br />
				<label htmlFor="securityQuestiosn">
					<div className={styles.label}>Security Questions</div>
					{/* <span>1.</span> */}
					<select id={styles.dropdown}>
						<option>Test</option>
						<option>Test</option>
						<option>Test</option>
					</select>
					<input id={styles.input} name="question1" type="text" />
					{/* <span>2.</span> */}
					<select id={styles.dropdown}>
						<option>Test</option>
						<option>Test</option>
						<option>Test</option>
					</select>
					<input id={styles.input} name="question2" type="text" />
					{/* <span>3.</span> */}
					<select id={styles.dropdown}>
						<option>Test</option>
						<option>Test</option>
						<option>Test</option>
					</select>
					<input id={styles.input} name="question2" type="text" />
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
