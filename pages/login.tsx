import { Box, useToast } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getProviders, getSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

import { LoginForm } from "../components/LoginForm";
import { AuthProvider, LoginUserType } from "../types/User";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const { referer } = context.req.headers;

    if (session) return { redirect: { destination: "/", permanent: false } };

    return {
        props: {
            providers: await getProviders(),
            referer: referer || "",
        },
    };
};

interface Props {
    providers: Array<AuthProvider>;
    referer: string;
}

const Login: NextPage<Props> = ({ providers, referer }) => {
    const toast = useToast();
    const router = useRouter();
    const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);

    const handleLogin = ({ email, password }: LoginUserType) =>
        signIn("credentials", { email, password, redirect: false }).then(
            (res) => {
                if (res?.error) {
                    switch (res.error) {
                        case "CredentialsSignin":
                            toast({
                                title: "Invalid Email/Password!",
                                status: "error",
                                duration: 3000,
                                position: "top",
                            });
                            break;

                        case "email_not_confirmed":
                            setEmailNotConfirmed(true);
                            break;
                        default:
                            break;
                    }
                } else {
                    router.push("/");
                }
            }
        );

    useEffect(() => {
        if (router?.query?.error) {
            switch (router?.query.error) {
                case "invalid_token":
                    toast({
                        title: "Invalid Token",
                        status: "error",
                        duration: 3000,
                        position: "top",
                    });
                    break;
                case "email_confirmed":
                    toast({
                        title: "Your email has been successfully confirmed!",
                        description: "Please Login",
                        duration: 3000,
                        position: "top",
                    });
                    break;
            }
            window.history.replaceState(null, "", "/login");
        }
    }, []);

    return (
        <>
            <Head>
                <title>Login</title>
                <meta content="Login" property="og:title" />
            </Head>
            <Box
                mx={{ base: "-1rem", md: "" }}
                py={{ base: "0.5rem", md: "4rem" }}
            >
                <LoginForm
                    handleLogin={handleLogin}
                    providers={providers}
                    referer={referer}
                    emailUnconfirmed={emailNotConfirmed}
                />
            </Box>
        </>
    );
};

export default Login;
