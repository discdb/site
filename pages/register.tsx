import { Box, useToast } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { RegisterForm } from "../components/RegisterForm";
import { LOCAL_API_URL } from "../helpers/api";
import { RegisterUserType } from "../types/User";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) return { redirect: { destination: "/", permanent: false } };

    return {
        props: {},
    };
};

interface Props {}

const Register: NextPage<Props> = () => {
    const toast = useToast();

    const router = useRouter();

    const handleRegister = async ({
        name,
        username,
        email,
        password,
    }: RegisterUserType) => {
        const response = await fetch(`${LOCAL_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                username,
                email,
                password,
            }),
        });

        if (response.ok) {
            toast({
                title: "Account successfully created!",
                description: "Please check your inbox to confirm your email.",
                duration: 5000,
                position: "top",
            });

            router.push("/login");
        } else {
            const parsed = await response.json();

            toast({
                title: parsed.message,
                status: "error",
                duration: 5000,
                position: "top",
            });
        }
    };

    return (
        <>
            <Head>
                <title>Register</title>
                <meta content="Register" property="og:title" />
            </Head>
            <Box
                mx={{ base: "-1rem", md: "" }}
                py={{ base: "0.5rem", md: "4rem" }}
            >
                <RegisterForm handleRegister={handleRegister} />
            </Box>
        </>
    );
};

export default Register;
