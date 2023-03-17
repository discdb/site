import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { useStore } from "../../contexts/state";
import { editUser } from "../../helpers/admin";
import { ManageUserType } from "../../types/User";
import ChakraSelect from "../ChakraSelect";

const EditUserModal = ({ user, isOpen, onClose }: any) => {
    const { dispatch } = useStore();
    const [editedUser, setEditedUser] = useState<ManageUserType>({ ...user });

    const handleOnChange = ({ target: { name, value } }: any) =>
        setEditedUser({ ...editedUser, [name]: value });

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>ID</FormLabel>
                        <Input
                            placeholder="Email"
                            value={editedUser?.id}
                            disabled
                        />
                    </FormControl>
                    <FormControl marginTop="0.5rem">
                        <FormLabel>Email</FormLabel>
                        <Input
                            placeholder="Email"
                            value={editedUser?.email}
                            name="email"
                            onChange={handleOnChange}
                        />
                    </FormControl>
                    <FormControl marginTop="0.5rem">
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Name"
                            value={editedUser?.name}
                            name="name"
                            onChange={handleOnChange}
                        />
                    </FormControl>
                    <FormControl marginTop="0.5rem">
                        <Text>Email Verified</Text>
                        <Input
                            placeholder="Email Verified"
                            defaultValue={`${!!user?.emailVerified}` || "false"}
                            disabled
                        />
                    </FormControl>
                    <FormControl marginTop="0.5rem">
                        <FormLabel>Disabled</FormLabel>
                        <Input
                            placeholder="Disabled"
                            defaultValue={user?.disabled}
                            disabled
                        />
                    </FormControl>
                    <FormControl marginTop="0.5rem">
                        <FormLabel>Roles</FormLabel>
                        <ChakraSelect
                            isMulti
                            names="roles"
                            defaultValue={editedUser?.roles || []}
                            onChange={(e: any) =>
                                setEditedUser({
                                    ...editedUser,
                                    roles: e.map((role: any) => role.value),
                                })
                            }
                            options={[
                                { value: "Moderator", label: "Moderator" },
                                { value: "Blogger", label: "Blogger" },
                                { value: "Admin", label: "Admin" },
                            ]}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        bg={"dvdbpurple.900"}
                        mr={2}
                        color="white"
                        _hover={{ background: "dvdbpurple.700" }}
                        onClick={() =>
                            editUser(dispatch, user, editedUser).then(() =>
                                onClose()
                            )
                        }
                    >
                        Save
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditUserModal;
