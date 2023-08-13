import { DeleteIcon, EditIcon, LinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    Divider,
    Flex,
    Heading,
    IconButton,
    Spacer,
    Spinner,
    useDisclosure,
    useToast,
    VStack,
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
import Image from "next/image";
import { PostPageLayout } from "../../../components/blog/PostPageLayout";

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
    const router = useRouter();

    return (
        <>
            <Box py={{ base: "1rem" }}>
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

                        <PostPageLayout post={post as BlogPostType} />
                    </>
                )}
            </Box>
        </>
    );
};

export default Blog;
