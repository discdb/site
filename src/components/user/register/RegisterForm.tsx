import "./index.css";
import { registerUser } from "./Register";

export const RegisterForm = () => {
	return (
		<div id="registerForm">
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
					<div className="label">Name</div>
					<input name="name" type="text" />
				</label>
				<br />
				<br />
				<label htmlFor="username">
					<div className="label">Username</div>
					<input name="username" type="text" />
				</label>
				<br />
				<br />
				<label htmlFor="email">
					<div className="label">Email</div>
					<input name="email" type="email" />
				</label>
				<br />
				<br />
				<label htmlFor="password">
					<div className="label">Password</div>
					<input name="password" type="password" />
				</label>
				<br />
				<br />

				<label htmlFor="password">
					<div className="label">Re-Enter Password</div>
					<input type="password" disabled />
				</label>
				<br />
				<br />
				<button id="loginButton" type="submit">
					Register
				</button>
			</form>
		</div>
	);
};
