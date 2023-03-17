import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";

export const DeletePostModal = ({ isOpen, onClose, deletePost }: any) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this post?
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="red"
                        mr={2}
                        onClick={() => deletePost().then(onClose)}
                    >
                        Delete
                    </Button>
                    <Button colorScheme="gray" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
