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
import { FiFile } from "react-icons/fi";

const ChakraFileInput = (props: any) => {
    const inputRef = useRef<any>();

    return (
        <FormControl isRequired>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={FiFile} />}
                />
                <input
                    type="file"
                    ref={inputRef}
                    {...props}
                    style={{ display: "none" }}
                ></input>
                <Input
                    placeholder={"Select file..."}
                    bg="white"
                    onClick={() => inputRef.current.click()}
                    focusBorderColor="dvdbpurple.900"
                />
                <InputRightAddon
                    px="0"
                    children={
                        <Button
                            w="100%"
                            px="2rem"
                            borderTopLeftRadius={0}
                            borderBottomLeftRadius={0}
                        >
                            Upload
                        </Button>
                    }
                />
            </InputGroup>
        </FormControl>
    );
};
export default ChakraFileInput;
