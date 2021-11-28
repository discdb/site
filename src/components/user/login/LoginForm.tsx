import { Link } from "react-router-dom";
import "./index.css";
import { loginUser } from "./Login";

export const LoginForm = () => {
	return (
		<div id="loginForm">
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
					<div className="label">Email</div>
					<input name="email" type="email" />
				</label>
				<br />
				<br />
				<label htmlFor="password">
					<div className="label">Password</div>
					<input name="password" type="password" />
				</label>
				<div id="forgotPasswordLink">
					<Link to="/forgot-password">Forgot Password?</Link>
				</div>
				<br />
				<button id="loginButton" type="submit">
					Login
				</button>
			</form>
		</div>
	);
};
