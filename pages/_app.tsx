import type { AppProps } from "next/app";
import { SessionProvider as Provider } from "next-auth/react";
import Layout from "../components/ui/Layout";
import "./index.css";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider refetchInterval={0} session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
};

export default App;
