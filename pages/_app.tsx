import type { AppProps } from "next/app";
import { SessionProvider as Provider } from "next-auth/react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import Layout from "../components/ui/Layout";
import "./index.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
