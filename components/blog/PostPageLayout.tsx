import { DeleteIcon, EditIcon, LinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Divider,
    Flex,
    Heading,
    IconButton,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { allowBloggerRole } from "../../helpers/auth";
import { deletePost } from "../../helpers/blog";
import { BlogPostType } from "../../types/BlogPost";
import ChakraNextLink from "../ChakraNextLink";
import { Markdown } from "../Markdown";
import { DeletePostModal } from "./DeletePostModal";

export const PostPageLayout = ({
    post,
    preview = false,
}: {
    post: BlogPostType;
    preview?: boolean;
}) => {
    const session = useSession();
    const router = useRouter();
    const toast = useToast();
    const deletePostModalProps = useDisclosure();

    return (
        <>
            {!preview && deletePostModalProps.isOpen && (
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
            <Box
                position={"relative"}
                minH={{ base: "250px", md: "500px", lg: "600px" }}
                w="100%"
                borderRadius="xl"
                overflow={"hidden"}
            >
                <Image
                    src="https://i.dvdb.video/i/images/vlcsnap-2023-02-20-14h36m21s720-2x_KemonoScale_v2-1x_NoiseToner-Uniform-Detailed_100000_G-4x-AnimeSharp.png"
                    layout="fill"
                    objectFit="cover"
                />
            </Box>
            <Box mx={{ md: "4rem" }} mt="1rem" pos="relative">
                <Box
                    borderWidth="1px"
                    borderRadius="xl"
                    overflow="hidden"
                    bg="white"
                    minH="85vh"
                    p={{ base: "1rem", md: "2rem" }}
                >
                    <Heading as="h2" size="2xl">
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
                            at {moment(post?.createdAt).format("MMMM Do, YYYY")}
                        </Box>
                    </Flex>
                    <Divider my={{ base: "1rem", md: "0" }} />
                    <Markdown>{post?.body || ""}</Markdown>
                </Box>
                {!preview && (
                    <>
                        <Box
                            pos="absolute"
                            right={{ base: "0.5rem", md: "-3rem" }}
                            top="1rem"
                        >
                            <VStack>
                                <IconButton
                                    aria-label="Share Post"
                                    title="Share Post"
                                    size={{ base: "sm", md: "md" }}
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
                                            size={{ base: "sm", md: "md" }}
                                        />
                                        <IconButton
                                            title="Delete Post"
                                            aria-label="Delete"
                                            size={{ base: "sm", md: "md" }}
                                            onClick={() =>
                                                deletePostModalProps.onOpen()
                                            }
                                            icon={
                                                <DeleteIcon color="darkred" />
                                            }
                                        />
                                    </>
                                )}
                            </VStack>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};
