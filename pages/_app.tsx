import "../styles/globals.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import Layout from "../components/Layout";
import StoreProvider from "../contexts/state";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const theme = extendTheme({
    colors: {
        dvdbpurple: { "700": "#4a4e69", "900": "#22223b" },
    },
    breakpoints: {
        tablet: "600px",
    },
});

function MyEmotionProvider({ nonce, children }: any) {
    const cache = createCache({ key: "dvdb", nonce } as any);
    return <CacheProvider value={cache} children={children} />;
}

const MyApp = ({ Component, pageProps }: AppProps) => {
    const nonce = pageProps.nonce;

    return (
        <ChakraProvider theme={theme}>
            <MyEmotionProvider nonce={nonce}>
                <StoreProvider>
                    <SessionProvider
                        refetchInterval={0}
                        session={pageProps.session}
                    >
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </SessionProvider>
                </StoreProvider>
            </MyEmotionProvider>
        </ChakraProvider>
    );
};

export default MyApp;
