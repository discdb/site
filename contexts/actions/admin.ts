import { ManageUserType } from "../../types/User";
import { ImageType } from "../../types/Image";
import * as CONSTANTS from "../constants/admin";

export const getAllUsers = (users: ManageUserType[]) => ({
    type: CONSTANTS.GET_ALL_USERS,
    users,
});

export const editUser = (user: ManageUserType) => ({
    type: CONSTANTS.EDIT_USER,
    user,
});

export const getAllImages = (images: ImageType[]) => ({
    type: CONSTANTS.GET_ALL_IMAGES,
    images,
});
