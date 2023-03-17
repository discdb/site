import { ManageUserType } from "../../types/User";
import { ImageType } from "../../types/Image";
import * as CONSTANTS from "../constants/admin";

type AdminReducerState = {
    users: ManageUserType[];
};

type Action = {
    type: string;
    users?: ManageUserType[];
    user?: ManageUserType;
    images?: ImageType[];
};

export const initialAdminState = {
    users: [],
    images: [],
};

export const adminReducer = (state: AdminReducerState, action: Action) => {
    switch (action.type) {
        case CONSTANTS.GET_ALL_USERS:
            return { ...state, users: action.users };
        case CONSTANTS.EDIT_USER:
            return {
                ...state,
                users: state.users.map((usr) =>
                    usr.id === action?.user?.id ? action.user : usr
                ),
            };
        case CONSTANTS.GET_ALL_IMAGES:
            return { ...state, images: action.images };
        case CONSTANTS.CLEAR_STATE:
            return initialAdminState;
        default:
            return state;
    }
};
