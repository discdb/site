import { memo, useState } from "react";
import {
    Button,
    Center,
    Flex,
    Heading,
    Input,
    InputGroup,
    Text,
    VStack,
} from "@chakra-ui/react";
import ChakraNextLink from "./ChakraNextLink";
import { emailRegex } from "../helpers/regex";

interface Props {
    sendResetPasswordEmail: any;
}

export const ForgotPasswordForm = memo(({ sendResetPasswordEmail }: Props) => {
    const [email, setEmail] = useState<string>("");

    return (
        <Center>
            <Flex
                direction={"column"}
                justify={"space-evenly"}
                h={"auto"}
                bg="white"
                borderRadius={"1rem"}
                width={{ base: "100%", md: "475px" }}
                minHeight="450px"
                px={[4, 8]}
            >
                <Center px={4} pt={8}>
                    <Heading fontWeight={"500"}>Forgot Password</Heading>
                </Center>
                <Text fontSize={"sm"}>
                    Forgot your password? Input your password below to receive a
                    email to reset it!
                </Text>
                <VStack spacing={4} mt={4}>
                    <InputGroup size="md" mb={4}>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={({ target: { value } }) =>
                                setEmail(value)
                            }
                            focusBorderColor="dvdbpurple.900"
                            maxLength={128}
                        />
                    </InputGroup>
                    <Button
                        h={12}
                        w={"100%"}
                        bg={"dvdbpurple.900"}
                        color="white"
                        _hover={{
                            background: "dvdbpurple.700",
                        }}
                        _disabled={{
                            background: "dvdbpurple.700",
                        }}
                        isDisabled={!email || !emailRegex.test(email)}
                        onClick={() => sendResetPasswordEmail(email)}
                    >
                        Send
                    </Button>
                </VStack>
                <Center>
                    <ChakraNextLink href="/login">
                        Return to Login
                    </ChakraNextLink>
                </Center>
            </Flex>
        </Center>
    );
});
