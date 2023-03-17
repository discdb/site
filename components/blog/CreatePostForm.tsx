import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Input,
    InputGroup,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Textarea,
} from "@chakra-ui/react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Markdown } from "../Markdown";

export const CreatePostForm = ({
    publishPost,
    savedPost,
    type = "create",
}: any) => {
    const session = useSession();

    const loggedInUser = session?.data?.user;

    const [title, setTitle] = useState(savedPost?.title || "");
    const [body, setBody] = useState(savedPost?.body || "");

    const characterPostLimit = 10000;

    return (
        <Tabs px={0} colorScheme="dvdbpurple.900">
            <TabList>
                <Tab>Write</Tab>
                <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
                <TabPanel px={0}>
                    <InputGroup size="md" mb={2}>
                        <Input
                            bg="white"
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={title}
                            onChange={({ target: { value } }) =>
                                setTitle(value)
                            }
                            focusBorderColor="dvdbpurple.900"
                        />
                    </InputGroup>
                    <InputGroup size="md" mb={2}>
                        <Textarea
                            bg="white"
                            placeholder="Body"
                            name="body"
                            resize="none"
                            rows={12}
                            value={body}
                            onChange={({ target: { value } }) => setBody(value)}
                            maxLength={characterPostLimit}
                            focusBorderColor="dvdbpurple.900"
                        />
                    </InputGroup>
                    <Divider />
                    {characterPostLimit - body.length}
                    <Button
                        h={10}
                        bg={"dvdbpurple.900"}
                        width={{ base: "100%", md: "50%", lg: "30%" }}
                        color="white"
                        float={"right"}
                        _hover={{ background: "dvdbpurple.700" }}
                        onClick={() => publishPost(title, body)}
                        disabled={
                            body.length > characterPostLimit ||
                            body.length === 0 ||
                            title.length === 0
                        }
                    >
                        {type === "edit" ? "Edit Post" : "Publish"}
                    </Button>
                </TabPanel>
                <TabPanel px={0}>
                    <Heading
                        as="h2"
                        size="2xl"
                        mb={{ base: "0.5rem", md: "1rem" }}
                        mt={{ md: "1rem" }}
                    >
                        {title}
                    </Heading>
                    <Flex py="1rem" m={0}>
                        <Box mt="0.5rem">
                            {" "}
                            Created by{" "}
                            <b>
                                {savedPost?.createdBy?.name ||
                                    savedPost?.createdBy.username ||
                                    loggedInUser?.name}
                            </b>{" "}
                            at{" "}
                            {moment(savedPost?.createdAt || new Date()).format(
                                "MMMM Do, YYYY"
                            )}
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
                        <Markdown>{body}</Markdown>
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
