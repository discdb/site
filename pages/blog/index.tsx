import { Box, Center, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { BlogPost } from "../../components/blog/BlogPost";
import ChakraNextLink from "../../components/ChakraNextLink";
import { useStore } from "../../contexts/state";
import { allowBloggerRole } from "../../helpers/auth";
import { fetchAllBlogPosts } from "../../helpers/blog";
import { BlogPostType } from "../../types/BlogPost";

const Blog: NextPage = () => {
    const { state, dispatch } = useStore();
    const { posts } = state.blog;
    const session = useSession();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (posts.length === 0) {
            fetchAllBlogPosts(dispatch, 20, 1).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head>
                <title>Blog</title>
                <meta content="Blog" property="og:title" />
            </Head>
            <Box py={{ base: "2rem", md: "4rem" }}>
                <Box justifyContent={"space-between"} display="flex">
                    <Heading
                        as="h2"
                        size="2xl"
                        mb={{ base: "2rem", md: "4rem" }}
                    >
                        Blog
                    </Heading>
                    {allowBloggerRole(session?.data) && (
                        <ChakraNextLink href="/blog/create">
                            <Heading
                                as="h2"
                                size="2xl"
                                mb={{ base: "2rem", md: "4rem" }}
                            >
                                +
                            </Heading>
                        </ChakraNextLink>
                    )}
                </Box>
                <SimpleGrid
                    minChildWidth={{ base: "250px", lg: "375px" }}
                    spacing="4"
                >
                    {!loading ? (
                        posts.map((post: BlogPostType, i: number) => (
                            <BlogPost key={i} post={post} />
                        ))
                    ) : (
                        <Center>
                            <Spinner />
                        </Center>
                    )}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default Blog;
