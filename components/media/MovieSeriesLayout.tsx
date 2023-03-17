import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Text,
} from "@chakra-ui/react";
import moment from "moment";
import { MutableRefObject, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { MovieSeriesType } from "../../types/Media";
import { ReleaseCard } from "./ReleaseCard";

export const MovieSeriesLayout = ({ media }: MovieSeriesType) => {
    const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref);

    console.log(media);

    return (
        <Grid
            templateAreas={{
                base: `"image image"
				  "title title"
				  "desc desc"
				  `,
                md: `"image title title title"
                  "desc desc desc desc"
				  "desc desc desc desc"
				  "desc desc desc desc"`,
                lg: `"image title title title"
                  "image desc desc desc"
				  "image desc desc desc"
				  "image desc desc desc"
                  `,
            }}
            templateRows={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
            gap={4}
            pt={"2rem"}
            pb={"5rem"}
            position="relative"
            overflow={"hidden"}
            mx={{ base: "-2rem", tablet: "-4rem", md: "-8rem" }}
            px={{ base: "2rem", tablet: "4rem", md: "8rem" }}
        >
            <div
                className="poster-background"
                style={{
                    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${media.backdrop_path})`,
                }}
            ></div>

            <GridItem
                mx={{ base: 0, tablet: "0.5rem" }}
                zIndex={1}
                area="image"
            >
                <Image
                    className="poster"
                    src={`https://www.themoviedb.org/t/p/w1280/${media.poster_path} `}
                    alt=""
                    borderRadius={12}
                />
            </GridItem>
            <GridItem mx={{ md: "1rem" }} zIndex={1} area="title">
                <Heading
                    as="h2"
                    size="xl"
                    mb={{ base: 0, md: "1rem" }}
                    fontWeight={700}
                    mt={{ base: "", tablet: "", md: "2rem" }}
                >
                    {media?.title ||
                        media?.name ||
                        media?.original_title ||
                        media?.original_name}{" "}
                </Heading>
                <Text mt={{ base: "0.5rem", md: "0" }}>
                    {moment(
                        new Date(media?.release_date || media?.first_air_date)
                    ).format("MM/DD/YYYY")}
                    {" • "}
                    {media.genres.map((genre: any, i: number) => (
                        <span key={i}>
                            {genre.name}
                            {media.genres.length - 1 !== i && ", "}
                        </span>
                    ))}
                    {media?.runtime && " • "}
                    {media?.runtime &&
                        moment.utc(media.runtime * 60000).format("H[h] m[m]")}
                </Text>
            </GridItem>
            <GridItem
                // mx={{ base: 0, tablet: '0.5rem' }}
                zIndex={1}
                area="desc"
                position={{ base: "absolute", md: "static" }}
                top={{ base: "-23rem" }}
                width="100%"
                marginTop={{ md: "-2rem" }}
            >
                <Accordion allowMultiple allowToggle defaultIndex={[0]}>
                    <AccordionItem border={0}>
                        <AccordionButton
                            justifyContent="space-between"
                            display="flex"
                            paddingInlineStart={0}
                            paddingInlineEnd={0}
                        >
                            <Heading
                                size="md"
                                mt={{ base: "1rem", md: "2rem" }}
                                pl={{ sm: "1rem" }}
                            >
                                Overview
                            </Heading>
                            <AccordionIcon mt={{ base: "1rem", md: "2rem" }} />
                        </AccordionButton>
                        <AccordionPanel px={{ base: 0, md: "1rem" }}>
                            <Text>{media.overview}</Text>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem border={0}>
                        <AccordionButton
                            justifyContent="space-between"
                            display="flex"
                            paddingInlineStart={0}
                            paddingInlineEnd={0}
                        >
                            <Heading size="md" pl={{ sm: "1rem" }}>
                                Releases
                            </Heading>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel px={{ base: 0, md: "1rem" }}>
                            <HStack
                                overflowX="scroll"
                                {...events}
                                ref={ref}
                                css={{
                                    "&": {
                                        msOverflowStyle: "none",
                                        scrollbarWidth: "none",
                                    },
                                    "&::-webkit-scrollbar": {
                                        display: "none",
                                    },
                                }}
                            >
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                                <ReleaseCard />
                            </HStack>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </GridItem>
        </Grid>
    );
};
