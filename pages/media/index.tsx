import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { MediaCard } from "../../components/media/MediaCard";
import { TMDB_API_KEY, TMDB_API_URL } from "../../helpers/api";
import { MovieType } from "../../types/Movie";
import { SeriesType } from "../../types/Series";

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch(
        `${TMDB_API_URL}/trending/all/week?api_key=${TMDB_API_KEY}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "*",
            },
        }
    );

    const { results } = await response.json();

    return results.length > 0
        ? {
              props: {
                  media: JSON.parse(JSON.stringify(results)),
              },
              revalidate: 360,
          }
        : { props: {}, notFound: true };
};

const Media: NextPage = ({ media }: any) => {
    return (
        <>
            <Head>
                <title>Explore</title>
                <meta content="Explore" property="og:title" />
            </Head>
            <Box py={{ base: "2rem", md: "4rem" }}>
                <Heading as="h2" size="2xl" mb={{ base: "2rem", md: "4rem" }}>
                    Explore
                </Heading>
                <SimpleGrid
                    minChildWidth={{ base: "150px", lg: "230px" }}
                    spacing="2"
                >
                    {media.map(
                        (
                            mda: MovieType &
                                SeriesType & { media_type: string },
                            i: number
                        ) => (
                            <MediaCard media={mda} key={i} />
                        )
                    )}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default Media;
