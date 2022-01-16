import "nprogress/nprogress.css";
import "./index.css";

import type { AppProps } from "next/app";
import Router from "next/router";
import { SessionProvider as Provider } from "next-auth/react";
import NProgress from "nprogress";

import Layout from "../components/ui/Layout";

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
