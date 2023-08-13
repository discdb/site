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
import { useEffect, useState } from "react";
import { BlogPostType } from "../../types/BlogPost";
import ChakraImageUpload from "../ChakraImageUpload";
import { Markdown } from "../Markdown";
import { PostPageLayout } from "./PostPageLayout";

export const CreatePostForm = ({
    publishPost,
    savedPost,
    type = "create",
}: any) => {
    const session = useSession();

    const loggedInUser = session?.data?.user;

    const [title, setTitle] = useState(savedPost?.title || "");
    const [body, setBody] = useState(savedPost?.body || "");
    const [image, setImage] = useState<any>();

    const characterPostLimit = 10000;
    const characterTitleLimit = 100;

    useEffect(() => {
        console.log(image, image?.name);
    }, [image]);

    return (
        <Tabs px={0} colorScheme="dvdbpurple.900">
            <TabList>
                <Tab>Write</Tab>
                <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
                <TabPanel px={0}>
                    <InputGroup size="md" mb={2}>
                        <ChakraImageUpload
                            onChange={({ target: { files } }: any) =>
                                setImage(files[0])
                            }
                            files={image}
                        />
                    </InputGroup>
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
                            maxLength={characterTitleLimit}
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
                    <PostPageLayout
                        preview
                        post={
                            {
                                title,
                                body,
                                createdBy: loggedInUser,
                                createdAt: new Date(),
                                ...savedPost,
                            } as BlogPostType
                        }
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
