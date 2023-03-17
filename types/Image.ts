import { CreatedByType } from "./User";

export interface ImageType {
    fileName: string;
    fileUrl: string;
    uploadedBy: CreatedByType;
}
