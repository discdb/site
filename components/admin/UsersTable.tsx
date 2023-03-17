import { EditIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from "@chakra-ui/react";

import { useState, memo } from "react";

import EditUserModal from "./EditUserModal";

import { Table, createColumn } from "react-chakra-pagination";
import moment from "moment";

import { ManageUserType } from "../../types/User";

export const UsersTable = memo(({ users }: { users: ManageUserType[] }) => {
    const [page, setPage] = useState(0);
    const userModalProps = useDisclosure();
    const [selectedUser, setSelectedUser] = useState<ManageUserType>({
        id: "",
        email: "",
        name: "",
        roles: [],
        image: "",
        createdAt: new Date(),
        emailVerified: null,
        disabled: false,
    });

    const tableData = users.map((usr) => ({
        ...usr,
        name: (
            <Flex align="center">
                <Avatar name={usr.name} src={usr.image} size="sm" mr="4" />
                <Text>{usr.name}</Text>
            </Flex>
        ),
        roles: usr?.roles?.toString() || "",
        emailVerified: `${!!usr?.emailVerified}` || "false",
        disabled: usr?.disabled?.toString() || "false",
        createdAt: moment(usr?.createdAt).format("MMMM Do, YYYY"),
        action: (
            <Menu>
                <MenuButton as={EditIcon} cursor="pointer" />
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            setSelectedUser(usr);
                            userModalProps.onOpen();
                        }}
                    >
                        Edit
                    </MenuItem>
                    <MenuItem color="darkred">Disable</MenuItem>
                    {/* <MenuItem color="red">Ban</MenuItem> */}
                </MenuList>
            </Menu>
        ),
    }));
    const columnHelper = createColumn<typeof tableData[0]>();
    const columns = [
        columnHelper.accessor("name", {
            cell: (info) => info.getValue(),
            header: "Name",
        }),

        columnHelper.accessor("email", {
            cell: (info) => info.getValue(),
            header: "Email",
        }),

        columnHelper.accessor("roles", {
            cell: (info) => info.getValue(),
            header: "Roles",
        }),
        columnHelper.accessor("createdAt", {
            cell: (info) => info.getValue(),
            header: "Registered",
        }),
        columnHelper.accessor("emailVerified", {
            cell: (info) => info.getValue(),
            header: "Email Confirmed",
        }),
        columnHelper.accessor("disabled", {
            cell: (info) => info.getValue(),
            header: "Disabled",
        }),
        columnHelper.accessor("action", {
            cell: (info) => info.getValue(),
            header: "",
        }),
    ];

    return (
        <>
            {userModalProps.isOpen && (
                <EditUserModal {...userModalProps} user={selectedUser} />
            )}
            <div className="users-table">
                <Table
                    colorScheme="blue"
                    emptyData={{
                        icon: Avatar,
                        text: "Nobody is registered here.",
                    }}
                    totalRegisters={users.length}
                    page={page}
                    onPageChange={(page) => setPage(page)}
                    columns={columns}
                    data={tableData}
                />
            </div>
        </>
    );
});
