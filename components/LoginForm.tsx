import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Text,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { signIn } from "next-auth/react";
import { ChangeEvent, memo, useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";

import { AuthProvider, LoginUserType } from "../types/User";
import { ConfirmEmailModal } from "./ConfirmEmailModal";
import { emailRegex } from "../helpers/regex";

interface Props {
    providers: Array<AuthProvider>;
    referer: string;
    handleLogin: any;
    emailUnconfirmed: boolean;
}

export const LoginForm = memo(
    ({ handleLogin, providers = [], referer, emailUnconfirmed }: Props) => {
        const [showPassword, setShowPassword] = useState(false);
        const confirmEmailModalProps = useDisclosure();
        const toast = useToast();

        const [user, setUser] = useState<LoginUserType>({
            email: "",
            password: "",
        });

        const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, [event.target.name]: event.target.value });

        const [emailError, setEmailError] = useState<boolean>(false);
        useEffect(() => setEmailError(!isEmail(user.email)), [user.email]);

        useEffect(() => {
            emailUnconfirmed && confirmEmailModalProps.onOpen();
        }, [emailUnconfirmed]);

        const disabled =
            !user.email ||
            !user.password ||
            emailError ||
            !emailRegex.test(user.email);

        return (
            <Center>
                <ConfirmEmailModal
                    {...confirmEmailModalProps}
                    resendEmail={async () => {
                        try {
                            await fetch("/api/auth/resend_email", {
                                method: "POST",
                                body: JSON.stringify({ email: user.email }),
                            });

                            toast({
                                title: "Email has been resent.",
                                duration: 3000,
                                position: "top",
                            });

                            confirmEmailModalProps.onClose();
                        } catch (err) {
                            console.log(err);
                        }
                    }}
                />
                <Flex
                    direction={"column"}
                    justify={"space-evenly"}
                    h={"auto"}
                    bg="white"
                    borderRadius={"1rem"}
                    width={{ base: "100%", md: "475px" }}
                    minHeight="550px"
                    px={[4, 8]}
                >
                    <Center px={4} pt={8}>
                        <Heading fontWeight={"500"}>
                            Welcome <b>back!</b>
                        </Heading>
                    </Center>

                    <VStack spacing={4} mt={8}>
                        <InputGroup size="md">
                            <Input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleOnChange}
                                isInvalid={
                                    user.email.length !== 0 && emailError
                                }
                                maxLength={128}
                                focusBorderColor="dvdbpurple.900"
                            />
                        </InputGroup>
                        <InputGroup size="md">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                onChange={handleOnChange}
                                maxLength={64}
                                focusBorderColor="dvdbpurple.900"
                            />
                            <InputRightElement width="3.25rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <ViewOffIcon />
                                    ) : (
                                        <ViewIcon />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </VStack>

                    <VStack spacing={4}>
                        <Button
                            h={12}
                            w={"100%"}
                            isDisabled={disabled}
                            onClick={() => handleLogin(user)}
                        >
                            Login
                        </Button>
                        {providers && (
                            <>
                                <Divider />
                                {Object.values(providers).map(
                                    ({ name, id }: AuthProvider) =>
                                        name !== "Login" && (
                                            <Button
                                                h={12}
                                                w={"100%"}
                                                bg={"dvdbpurple.900"}
                                                color="white"
                                                _hover={{
                                                    background:
                                                        "dvdbpurple.700",
                                                }}
                                                key={name}
                                                onClick={() =>
                                                    signIn(id, {
                                                        callbackUrl: referer,
                                                        email: user.email,
                                                    })
                                                }
                                            >
                                                Login With {name}
                                            </Button>
                                        )
                                )}
                            </>
                        )}
                    </VStack>
                    <Flex justifyContent={"space-between"}>
                        <NextLink href="/register" passHref>
                            <Link>New User?</Link>
                        </NextLink>
                        <NextLink href="/forgot-password" passHref>
                            <Link>Forgot your password?</Link>
                        </NextLink>
                    </Flex>
                </Flex>
            </Center>
        );
    }
);
