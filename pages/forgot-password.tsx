import { Box } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import Mailer from "../helpers/mailer";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { token } = query;

    // const result =
    //     token &&
    //     token.length > 0 &&
    //     (await Mailer.confirmPasswordResetToken(token as string));

    return {
        // redirect: result
        //     ? undefined
        //     : {
        //           source: "/forgot-password",
        //           destination: "/login?error=invalid_token",
        //           permanent: false,
        //       },
        props: {
            // user: result,
        },
    };
};

const Verify: NextPage<{ user: { id: string; email: string } }> = ({
    user,
}) => {
    return (
        <>
            <Box
                mx={{ base: "-1rem", md: "" }}
                py={{ base: "0.5rem", md: "4rem" }}
            >
                <ForgotPasswordForm sendResetPasswordEmail={() => {}} />
            </Box>
        </>
    );
};

export default Verify;
