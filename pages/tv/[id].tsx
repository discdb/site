import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { MovieSeriesLayout } from "../../components/media/MovieSeriesLayout";
import { TMDB_API_KEY, TMDB_API_URL } from "../../helpers/api";
import { MovieSeriesType } from "../../types/Media";
import { SeriesType } from "../../types/Series";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { id } = query;

    const response = await fetch(
        `${TMDB_API_URL}/tv/${id}?api_key=${TMDB_API_KEY}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return {
        props: {
            media: (await response.json()) as SeriesType,
        },
    };
};

const SeriesPage: NextPage<MovieSeriesType> = ({ media }) => {
    return (
        <>
            <Head>
                <title>{media.original_name}</title>
                <meta content={media.original_name} property="og:title" />
            </Head>
            <MovieSeriesLayout media={{ ...media, media_type: "tv" }} />
        </>
    );
};

export default SeriesPage;
