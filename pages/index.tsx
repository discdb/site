import {
    AbsoluteCenter,
    Box,
    Button,
    Center,
    Divider,
    Heading,
    IconButton,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BlogPost } from "../components/blog/BlogPost";
import ChakraNextLink from "../components/ChakraNextLink";
import { BlogPost as BlogPostModel, User } from "../models";
import { BlogPostType } from "../types/BlogPost";

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const result = await BlogPostModel.findAll({
        limit: 3,
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

    return result
        ? {
              props: {
                  posts: JSON.parse(JSON.stringify(result)),
              },
              revalidate: 60,
          }
        : { props: {}, notFound: true };
};

interface Props {
    posts: BlogPostType[];
}

const Home: NextPage<Props> = ({ posts = [] }) => {
    console.log(posts);

    return (
        <>
            <Head>
                <title>Home</title>
                <meta content="Home" property="og:title" />
            </Head>
            <Center>
                <Box
                    maxW={["100%", "80%", "65%"]}
                    height="80%"
                    pt={{ base: "8rem", lg: "14rem" }}
                    pb={{ base: "8rem", lg: "14rem" }}
                >
                    <Heading mb={4} as="h2" size="3xl">
                        Preserved for the future.
                    </Heading>
                    <Text fontSize="xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam
                    </Text>
                    <Box textAlign="right">
                        <ChakraNextLink href={"/media"}>
                            <Button
                                size="md"
                                color="black"
                                mt="24px"
                                p=".6rem 2rem"
                                border="2px"
                                bg="white"
                                borderRadius="1rem"
                                borderColor="gray.200"
                            >
                                Explore the database
                            </Button>
                        </ChakraNextLink>
                    </Box>
                </Box>
            </Center>

            <Box position="relative" padding="10">
                <Divider borderColor={"dvdbpurple.300"} pb="1rem" />
                <AbsoluteCenter
                    bg="var(--chakra-colors-gray-100)"
                    p="2rem"
                    top="3.4rem"
                >
                    <IconButton
                        icon={<AiOutlineArrowDown />}
                        aria-label=""
                        onClick={() => {
                            document.getElementById("blog")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                    />
                </AbsoluteCenter>
            </Box>
            <Center
                marginLeft={{ base: "-2rem", md: "-4rem" }}
                marginRight={{ base: "-1rem", md: "-4rem" }}
                py="3rem"
            >
                <VStack>
                    <Heading mb={4} as="h5" size="2xl" id="blog">
                        The Blog
                    </Heading>
                    <Box maxW={["100%", "80%", "65%"]} h="250px">
                        <SimpleGrid
                            minChildWidth={{ base: "250px", lg: "375px" }}
                            spacing="4"
                        >
                            {posts.map((post: BlogPostType, i: number) => (
                                <BlogPost key={i} post={post} />
                            ))}
                        </SimpleGrid>
                    </Box>
                </VStack>
            </Center>
        </>
    );
};

export default Home;
