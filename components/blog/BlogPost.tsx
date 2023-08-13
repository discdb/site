import { Badge, Box, Card, CardBody, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { memo } from "react";
import removeMd from "remove-markdown";

import { BlogPostType } from "../../types/BlogPost";

export const BlogPost = memo(({ post }: { post: BlogPostType }) => {
    const isNewPost = () => {
        const postDate = new Date(post.createdAt).getTime();

        const oneDay = Date.now() - 1 * 24 * 60 * 60 * 1000;

        return oneDay < postDate;
    };

    const newPost = isNewPost();

    return (
        <NextLink passHref href={`/blog/${post.id}`}>
            <Card
                as={motion.a}
                whileHover={{ scale: 1.025 }}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                h="200px"
                w="500px"
                size="md"
            >
                <Image
                    objectFit="cover"
                    w="200px"
                    src={
                        "https://i.dvdb.video/i/images/vlcsnap-2023-02-20-14h36m21s720-2x_KemonoScale_v2-1x_NoiseToner-Uniform-Detailed_100000_G-4x-AnimeSharp.png"
                    }
                    alt=""
                    bg="lightgrey"
                />
                <CardBody>
                    <Box display="flex" alignItems="baseline">
                        {newPost && (
                            <Badge
                                borderRadius="full"
                                px="2"
                                colorScheme="teal"
                            >
                                New
                            </Badge>
                        )}
                    </Box>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        noOfLines={1}
                    >
                        {post.title}
                    </Box>
                    <Box>
                        {removeMd(post.body).substring(0, 125)}{" "}
                        {post.body.length > 125 && "..."}
                    </Box>
                </CardBody>
            </Card>
        </NextLink>
    );
});
