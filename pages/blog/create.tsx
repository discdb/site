import { Center, Flex, Heading, useToast } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { CreatePostForm } from "../../components/blog/CreatePostForm";
import { allowBloggerRole } from "../../helpers/auth";
import { addNewPost } from "../../helpers/blog";
import { useStore } from "../../contexts/state";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!allowBloggerRole(session))
        return {
            redirect: {
                destination: session ? "/blog" : "/login",
                permanent: false,
            },
        };

    return {
        props: {},
    };
};

const CreatePostPage: NextPage = () => {
    const { dispatch } = useStore();
    const router = useRouter();
    const toast = useToast();

    const publishPost = async (title: string, body: string) =>
        addNewPost(dispatch, { title, body })
            .catch((err) => {
                toast({
                    title: err,
                    status: "error",
                    duration: 2500,
                    position: "top",
                });
            })
            .then(() => {
                toast({
                    title: "Post successfully created!",
                    status: "success",
                    duration: 2500,
                    position: "top",
                });

                router.push("/blog");
            });

    return (
        <Center>
            <Flex direction="column" width={{ base: "100%", md: "75%" }}>
                <Heading textAlign={"center"} py={4}>
                    Create Post
                </Heading>
                <CreatePostForm publishPost={publishPost} />
            </Flex>
        </Center>
    );
};

export default CreatePostPage;
