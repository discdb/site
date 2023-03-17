import { NextPage } from "next";

export const getServerSideProps = async () => {
    return {
        redirect: {
            destination: "https://discord.gg/HkvcwnHStn",
            permanent: false,
        },
    };
};

const Discord: NextPage = () => {
    return <></>;
};

export default Discord;
