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

export const DeleteImageModal = ({ isOpen, onClose, deleteImage }: any) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Image</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this image?
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="red"
                        mr={2}
                        onClick={() => deleteImage().then(onClose)}
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
