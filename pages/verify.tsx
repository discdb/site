import type { GetServerSideProps, NextPage } from "next";
import Mailer from "../helpers/mailer";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { token } = query;

    const result =
        token &&
        token.length > 0 &&
        (await Mailer.confirmEmail(token as string));

    return {
        redirect: {
            source: "/verify",
            destination: result
                ? "/login?error=email_confirmed"
                : "/login?error=invalid_token",
            permanent: false,
        },
    };
};

const Verify: NextPage = () => {
    return <></>;
};

export default Verify;
