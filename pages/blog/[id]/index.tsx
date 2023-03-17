import { DeleteIcon, EditIcon, LinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    Spacer,
    Spinner,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import moment from "moment";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import ChakraNextLink from "../../../components/ChakraNextLink";
import { allowBloggerRole } from "../../../helpers/auth";
import { deletePost } from "../../../helpers/blog";
import { BlogPostType } from "../../../types/BlogPost";
import { useRouter } from "next/router";
import { DeletePostModal } from "../../../components/blog/DeletePostModal";
import { Markdown } from "../../../components/Markdown";
import { BlogPost, User } from "../../../models";
import RemoveMarkdown from "remove-markdown";

export const getStaticPaths: GetStaticPaths = async () => {
    const results = await BlogPost.findAll({
        limit: 50,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["createdById"] },
        include: [
            {
                model: User,
                required: true,
                as: "createdBy",
                attributes: ["name", "image", "id"],
            },
        ],
    });

    const paths = results.map((post: any) => ({
        params: { id: post.id },
    }));

    return {
        fallback: "blocking",
        paths,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as any;

    if (!id) {
        return { props: {}, notFound: true };
    }

    const result = await BlogPost.findOne({
        where: { id },
        attributes: { exclude: ["createdById"] },
        include: [
            {
                model: User,
                required: true,
                as: "createdBy",
                attributes: ["name", "image", "id"],
            },
        ],
    });

    return result
        ? {
              props: {
                  post: JSON.parse(JSON.stringify(result.toJSON())),
              },
              revalidate: 60,
          }
        : { props: {}, notFound: true };
};

interface Props {
    post: BlogPostType;
}

const Blog: NextPage<Props> = ({ post = undefined }) => {
    const session = useSession();
    const router = useRouter();
    const toast = useToast();

    const deletePostModalProps = useDisclosure();

    return (
        <>
            <Box py={{ base: "2rem", md: "4rem" }}>
                {!router.isFallback && !post ? (
                    <Center>
                        <Spinner />
                    </Center>
                ) : (
                    <>
                        <Head>
                            <title>{post?.title}</title>
                            <meta content={post?.title} property="og:title" />
                            <meta
                                content={RemoveMarkdown(
                                    post?.body?.substring(0, 500) as string
                                )}
                                property="og:description"
                            />
                        </Head>
                        {deletePostModalProps.isOpen && (
                            <DeletePostModal
                                {...deletePostModalProps}
                                deletePost={() =>
                                    deletePost(post?.id || "").then(() => {
                                        router.push("/blog");
                                        toast({
                                            title: "Post successfully deleted.",
                                            status: "success",
                                            duration: 2500,
                                            position: "top",
                                        });
                                    })
                                }
                            />
                        )}
                        <Heading
                            as="h2"
                            size="2xl"
                            mb={{ base: "0.5rem", md: "2rem" }}
                        >
                            {post?.title}
                        </Heading>
                        <Flex py="1rem" m={0}>
                            <Box mt="0.5rem">
                                {" "}
                                Created by{" "}
                                <b>
                                    <ChakraNextLink
                                        href={`/users/${post?.createdBy.id}`}
                                    >
                                        {post?.createdBy?.name ||
                                            post?.createdBy.username}
                                    </ChakraNextLink>
                                </b>{" "}
                                at{" "}
                                {moment(post?.createdAt).format(
                                    "MMMM Do, YYYY"
                                )}
                            </Box>
                            <Spacer />
                            <Box>
                                <Flex>
                                    <IconButton
                                        aria-label="Share Post"
                                        title="Share Post"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `https://dvdb.video/blog/${
                                                    post?.id || ""
                                                }`
                                            );

                                            toast({
                                                title: "Share link copied!",
                                                status: "success",
                                                duration: 2500,
                                                position: "top",
                                            });
                                        }}
                                        icon={<LinkIcon />}
                                    />
                                    {allowBloggerRole(session.data) && (
                                        <>
                                            <IconButton
                                                title="Edit Post"
                                                onClick={() =>
                                                    router.push(
                                                        `/blog/${
                                                            post?.id || ""
                                                        }/edit`
                                                    )
                                                }
                                                aria-label="Edit"
                                                icon={<EditIcon />}
                                            />
                                            <IconButton
                                                title="Delete Post"
                                                aria-label="Delete"
                                                onClick={() =>
                                                    deletePostModalProps.onOpen()
                                                }
                                                icon={
                                                    <DeleteIcon color="darkred" />
                                                }
                                            />
                                        </>
                                    )}
                                </Flex>
                            </Box>
                        </Flex>

                        <Box
                            borderWidth="1px"
                            borderRadius="xl"
                            overflow="hidden"
                            bg="white"
                            minH="85vh"
                            p={{ base: "1rem", md: "2rem" }}
                        >
                            <Markdown>{post?.body || ""}</Markdown>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default Blog;
