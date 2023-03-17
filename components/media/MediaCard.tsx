import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
import { memo } from "react";

import { MovieSeriesType } from "../../types/Media";

export const MediaCard = memo(({ media }: MovieSeriesType) => {
    return (
        <NextLink passHref href={`/${media.media_type}/${media.id}`}>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
                width="220px"
                height="330px"
                as={motion.a}
                whileHover={{ scale: 1.025 }}
            >
                <Image
                    src={`https://www.themoviedb.org/t/p/w1280${media.poster_path} `}
                    objectFit="cover"
                    width="220"
                    height="330"
                    layout="responsive"
                />
                {/* <Box p="3">
                    <Box display="flex" alignItems="baseline"></Box>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        noOfLines={1}
                    >
                        <Flex justifyContent={"space-between"} noOfLines={1}>
                            <span>{media?.title || media?.name} </span>
                            <span>
                                (
                                {new Date(
                                    media?.first_air_date || media?.release_date
                                ).getFullYear()}
                                )
                            </span>
                        </Flex>
                    </Box>
                    <Box noOfLines={2}>{media.overview}</Box>
                </Box> */}
            </Box>
        </NextLink>
    );
});
