import {
    ChevronDownIcon,
    ChevronRightIcon,
    CloseIcon,
    HamburgerIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Button,
    Collapse,
    Flex,
    Icon,
    IconButton,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";

import ChakraNextLink from "./ChakraNextLink";
import { UserAccountDropdown } from "./UserAccountDropdown";

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const session = useSession();

    return (
        <Box>
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{ base: 6 }}
                px={{ base: 4, md: 0 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
                position="relative"
                zIndex={1}
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                    display={{ base: "flex", md: "none" }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: "center", md: "start" }}
                    ml={{ base: 0, tablet: "4rem", md: "8rem" }}
                >
                    <NextLink href="/" passHref>
                        <Link>
                            <Text
                                textAlign={useBreakpointValue({
                                    base: "center",
                                    md: "left",
                                })}
                                fontFamily={"heading"}
                                color={useColorModeValue("gray.800", "white")}
                            >
                                DVDB
                            </Text>
                        </Link>
                    </NextLink>

                    <Flex display={{ base: "none", md: "flex" }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={"flex-end"}
                    direction={"row"}
                    spacing={6}
                    mr={{ base: 0, tablet: "4rem", md: "8rem" }}
                >
                    {session.status !== "authenticated" ? (
                        <>
                            <NextLink href="/login" passHref>
                                <Button
                                    as={"a"}
                                    fontSize={"sm"}
                                    fontWeight={400}
                                    variant={"link"}
                                >
                                    Login
                                </Button>
                            </NextLink>
                            <NextLink href="/register" passHref>
                                <Link>
                                    <Button
                                        display={{
                                            base: "none",
                                            md: "inline-flex",
                                        }}
                                        fontSize={"sm"}
                                        fontWeight={600}
                                        color={"white"}
                                        bg={"dvdbpurple.900"}
                                        _hover={{
                                            bg: "dvdbpurple.700",
                                        }}
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </NextLink>
                        </>
                    ) : (
                        <UserAccountDropdown />
                    )}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");

    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <ChakraNextLink
                                p={2}
                                fontSize={"sm"}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: "none",
                                    color: linkHoverColor,
                                }}
                                href={navItem.href ?? "#"}
                            >
                                {navItem.label}
                            </ChakraNextLink>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={"xl"}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={"xl"}
                                minW={"sm"}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.label}
                                            {...child}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={"group"}
            display={"block"}
            p={2}
            rounded={"md"}
            _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
        >
            <Stack direction={"row"} align={"center"}>
                <Box>
                    <Text
                        transition={"all .3s ease"}
                        _groupHover={{ color: "pink.400" }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={"sm"}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={"all .3s ease"}
                    transform={"translateX(-10px)"}
                    opacity={0}
                    _groupHover={{
                        opacity: "100%",
                        transform: "translateX(0)",
                    }}
                    justify={"flex-end"}
                    align={"center"}
                    flex={1}
                >
                    <Icon
                        color={"pink.400"}
                        w={5}
                        h={5}
                        as={ChevronRightIcon}
                    />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ md: "none" }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                justify={"space-between"}
                align={"center"}
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.600", "gray.200")}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={"all .25s ease-in-out"}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity

                // style={{ marginTop: "0!important" }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align={"start"}
                >
                    {children &&
                        children.map((child, i) => (
                            <ChakraNextLink
                                href={`${child.href}`}
                                key={i}
                                py={2}
                            >
                                {child.label}
                            </ChakraNextLink>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Blog",
        href: "/blog",
    },
    {
        label: "Guides",
        href: "/guides",
    },
    {
        label: "Media",
        href: "/media",
    },
];
