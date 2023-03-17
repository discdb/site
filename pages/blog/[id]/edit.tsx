import { Center, Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { CreatePostForm } from "../../../components/blog/CreatePostForm";
import { allowBloggerRole } from "../../../helpers/auth";
import { editPost, fetchPost } from "../../../helpers/blog";
import { BlogPostType } from "../../../types/BlogPost";
import { useStore } from "../../../contexts/state";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const { id } = context.query;

    if (!allowBloggerRole(session))
        return {
            redirect: { destination: `/blog/${id}`, permanent: false },
        };

    return {
        props: {
            id,
        },
    };
};

interface Props {
    id: string;
}
const EditPostPage: NextPage<Props> = ({ id }) => {
    const { state, dispatch } = useStore();
    const router = useRouter();
    const toast = useToast();

    const [post, setPost] = useState<BlogPostType>();
    const [loading, setLoading] = useState(true);

    const { posts } = state.blog;

    const findPost = () =>
        new Promise(async (resolve) => {
            const foundPost =
                posts.find((pst) => pst.id === id) ??
                (await fetchPost(id as string));

            setPost(foundPost as BlogPostType);

            resolve(foundPost);
        });

    useEffect(() => {
        findPost()
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Center>
            <Flex direction="column" width={{ base: "100%", md: "75%" }}>
                <Heading textAlign="center" py={4}>
                    Edit Post
                </Heading>
                {loading ? (
                    <Spinner />
                ) : (
                    <CreatePostForm
                        publishPost={(title: string, body: string) =>
                            editPost(dispatch, post, {
                                ...post,
                                title,
                                body,
                                id,
                            }).then(() => {
                                router.push(`/blog/${id}`);
                                toast({
                                    title: "Post successfully edited.",
                                    status: "success",
                                    duration: 2500,
                                    position: "top",
                                });
                            })
                        }
                        savedPost={post}
                        type="edit"
                    />
                )}
            </Flex>
        </Center>
    );
};

export default EditPostPage;
