import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import Layout from "../components/Layout";
import "./index.css";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider
			options={{
				clientMaxAge: 0,
				keepAlive: 0,
			}}
			session={pageProps.session}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
};

export default App;
