import {
    Button,
    FormControl,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiImage } from "react-icons/fi";

const ChakraImageUpload = (props: any) => {
    const inputRef = useRef<any>();

    const imageFileTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
    ];

    return (
        <FormControl isRequired>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={FiImage} />}
                />
                <input
                    type="file"
                    ref={inputRef}
                    {...props}
                    style={{ display: "none" }}
                    accept={imageFileTypes}
                ></input>
                <Input
                    placeholder={props?.files?.name || "Select image..."}
                    bg="white"
                    onClick={() => inputRef.current.click()}
                    focusBorderColor="dvdbpurple.900"
                    disabled
                />
            </InputGroup>
        </FormControl>
    );
};
export default ChakraImageUpload;
