import { DeleteIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Button,
    Flex,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { usePresignedUpload } from "next-s3-upload";
import { useState, memo } from "react";
import { createColumn, Table } from "react-chakra-pagination";
import { ImageType } from "../../types/Image";
import { deleteImage, getAllImages } from "../../helpers/admin";
import { DeleteImageModal } from "./DeleteImageModal";
import { useStore } from "../../contexts/state";

export const ImagesTable = memo(({ images }: { images: ImageType[] }) => {
    const { dispatch } = useStore();
    const [page, setPage] = useState(0);

    const toast = useToast();
    const { FileInput, openFileDialog, uploadToS3 } = usePresignedUpload();
    const deleteImageModalProps = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<ImageType>();

    const handleFileChange = async (file: any) => {
        const { url } = await uploadToS3(file);

        const response = await fetch("/api/admin/images/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName: file.name, fileUrl: url }),
        })
            .then((res) => res.json())
            .then(() => getAllImages(dispatch));
        // Add image to db
    };

    const tableData = images.map((img: any) => ({
        ...img,
        fileName: (
            <a target={"_blank"} href={`${img.fileUrl}`}>
                {img.fileName}
            </a>
        ),
        uploadedBy: (
            <>
                <Flex align="center">
                    <Avatar
                        name={img?.uploadedBy?.name}
                        src={img?.uploadedBy?.image}
                        size="sm"
                        mr="4"
                    />
                    <Text>{img?.uploadedBy?.name}</Text>
                </Flex>
            </>
        ),
        action: (
            <DeleteIcon
                color="darkred"
                aria-label="delete"
                onClick={() => {
                    setSelectedImage(img);
                    deleteImageModalProps.onOpen();
                }}
            />
        ),
    }));

    const columnHelper = createColumn<typeof tableData[0]>();
    const columns = [
        columnHelper.accessor("uploadedBy", {
            cell: (info) => info.getValue(),
            header: "Uploaded By",
        }),
        columnHelper.accessor("fileName", {
            cell: (info) => info.getValue(),
            header: "File Name",
        }),
        columnHelper.accessor("action", {
            cell: (info) => info.getValue(),
            header: "",
        }),
    ];

    return (
        <>
            {selectedImage && (
                <DeleteImageModal
                    {...deleteImageModalProps}
                    deleteImage={() =>
                        deleteImage(selectedImage)
                            .then((res) => {
                                if (res) throw res.toString();
                                toast({
                                    title: "Image successfully deleted!",
                                    duration: 3000,
                                    position: "top",
                                });
                            })
                            .then(() => getAllImages(dispatch))
                            .catch((err) =>
                                toast({
                                    title: err,
                                    status: "error",
                                    duration: 3000,
                                    position: "top",
                                })
                            )
                    }
                />
            )}
            <FileInput onChange={handleFileChange} />

            <Button
                bg={"dvdbpurple.900"}
                color="white"
                _hover={{ background: "dvdbpurple.700" }}
                onClick={openFileDialog}
                position="absolute"
                top="0"
                right="0"
                size="sm"
            >
                Upload file
            </Button>

            <div className="images-table">
                <Table
                    colorScheme="blue"
                    emptyData={{
                        text: "No images found",
                    }}
                    totalRegisters={images.length}
                    page={page}
                    onPageChange={(page) => setPage(page)}
                    columns={columns}
                    data={tableData}
                />
            </div>
        </>
    );
});
