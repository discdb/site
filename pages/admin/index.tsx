import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useStore } from "../../contexts/state";
import { getAllImages, getAllUsers } from "../../helpers/admin";
import { UsersTable } from "../../components/admin/UsersTable";
import { ImagesTable } from "../../components/admin/ImagesTable";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const user: any = session?.user;

    if (!session || !user.roles.includes("Admin"))
        return { redirect: { destination: "/", permanent: false } };

    return {
        props: {},
    };
};

const AdminHome: NextPage = () => {
    const { state, dispatch } = useStore();
    const { users, images } = state.admin;

    const [usersLoading, setUsersLoading] = useState(true);
    const [imagesLoading, setImagesLoading] = useState(true);

    useEffect(() => {
        if (images.length === 0) {
            getAllImages(dispatch).finally(() => setImagesLoading(false));
        } else {
            setImagesLoading(false);
        }

        if (users.length === 0) {
            getAllUsers(dispatch).finally(() => setUsersLoading(false));
        } else {
            setUsersLoading(false);
        }

        return () => {
            setUsersLoading(true);
            setImagesLoading(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Box py={{ base: "2rem", md: "4rem" }}>
                <Heading as="h3" size="2xl" mb={{ base: "2rem", md: "4rem" }}>
                    Admin Home
                </Heading>

                <Heading as="h4" size="md" mb={4}>
                    Users
                </Heading>
                {usersLoading ? (
                    <Center>
                        <Spinner />
                    </Center>
                ) : (
                    <UsersTable users={users} />
                )}

                <Box position={"relative"} mt="2rem">
                    <Heading as="h4" size="md">
                        Images
                    </Heading>
                    {imagesLoading ? (
                        <Center>
                            <Spinner />
                        </Center>
                    ) : (
                        <ImagesTable images={images} />
                    )}
                </Box>
            </Box>
        </>
    );
};

export default AdminHome;
