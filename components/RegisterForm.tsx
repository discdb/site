import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Button,
    Center,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChangeEvent, memo, useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { emailRegex, passwordRegex } from "../helpers/regex";

import { RegisterUserType } from "../types/User";

export const RegisterForm = memo(({ handleRegister }: any) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [user, setUser] = useState<RegisterUserType>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const [emailError, setEmailError] = useState<boolean>(false);
    useEffect(() => setEmailError(!isEmail(user.email)), [user.email]);

    const [passwordError, setPasswordError] = useState<boolean>(false);
    useEffect(() => {
        !!user.password &&
            !!user.confirm_password &&
            setPasswordError(user.password !== user.confirm_password);
    }, [user.password, user.confirm_password]);

    const disabled =
        !user.username ||
        !user.email ||
        !user.password ||
        !user.confirm_password ||
        passwordError ||
        emailError ||
        !emailRegex.test(user.email);

    return (
        <Center>
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
                        Get <b>started</b>
                    </Heading>
                </Center>

                <VStack spacing={4} my={8}>
                    <InputGroup size="md">
                        <Input
                            type="text"
                            placeholder="Display Name"
                            name="name"
                            onChange={handleOnChange}
                            focusBorderColor="dvdbpurple.900"
                            maxLength={64}
                        />
                    </InputGroup>
                    <InputGroup size="md">
                        <Input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleOnChange}
                            focusBorderColor="dvdbpurple.900"
                            maxLength={16}
                        />
                    </InputGroup>
                    <InputGroup size="md">
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleOnChange}
                            focusBorderColor="dvdbpurple.900"
                            isInvalid={
                                !!user?.email &&
                                emailError &&
                                !emailRegex.test(user.email)
                            }
                            maxLength={128}
                        />
                    </InputGroup>
                    <Tooltip
                        label="Passwords must have at least 8 characters and contain at least one of the following: letters, numbers, and symbols"
                        placement="auto"
                        bg={"dvdbpurple.900"}
                        color="white"
                        isOpen={
                            !!user.password &&
                            !passwordRegex.test(user.password)
                        }
                    >
                        <InputGroup size="md">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                focusBorderColor="dvdbpurple.900"
                                onChange={handleOnChange}
                                isInvalid={
                                    !!user?.password &&
                                    (passwordError ||
                                        !passwordRegex.test(user.password))
                                }
                                maxLength={64}
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
                    </Tooltip>

                    <InputGroup size="md">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirm_password"
                            onChange={handleOnChange}
                            focusBorderColor="dvdbpurple.900"
                            isInvalid={
                                !!user?.confirm_password &&
                                (passwordError ||
                                    !passwordRegex.test(user.password))
                            }
                            maxLength={64}
                        />
                        <InputRightElement width="3.25rem">
                            <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <ViewOffIcon />
                                ) : (
                                    <ViewIcon />
                                )}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {passwordError && (
                        <Text color="red.500">Passwords do not match!</Text>
                    )}
                </VStack>

                <Button
                    h={12}
                    w={"100%"}
                    bg={"dvdbpurple.900"}
                    color="white"
                    _hover={{ background: "dvdbpurple.700" }}
                    _disabled={{ background: "dvdbpurple.700" }}
                    isDisabled={disabled}
                    onClick={() => handleRegister(user)}
                >
                    Register
                </Button>
                <Center py={4}>
                    <NextLink href="/login" passHref>
                        <Link>Already have an account?</Link>
                    </NextLink>
                </Center>
            </Flex>
        </Center>
    );
});
