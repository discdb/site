import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";

export const ConfirmEmailModal = ({ isOpen, onClose, resendEmail }: any) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Unable to login.</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Your email is not confirmed, please check your inbox.
                </ModalBody>
                <ModalFooter>
                    <Flex justifyContent={"space-between"} w="100%">
                        <Text
                            color="#007fff"
                            fontSize="0.9rem"
                            onClick={resendEmail}
                            cursor="pointer"
                        >
                            Resend confirmation email
                        </Text>
                        <Button colorScheme="gray" onClick={onClose}>
                            Close
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
