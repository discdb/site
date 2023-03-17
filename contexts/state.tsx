import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useMemo,
    useReducer,
} from "react";

import { BlogPostType } from "../types/BlogPost";
import { ImageType } from "../types/Image";
import { ManageUserType } from "../types/User";
import { initialUserState, userReducers } from "./index";

interface InitialStateType {
    blog: {
        posts: BlogPostType[];
    };
    admin: {
        users: ManageUserType[];
        images: ImageType[];
    };
}

interface AppContextType {
    state: InitialStateType;
    dispatch: Dispatch<any>;
}

export const AppContext = createContext<AppContextType>({
    state: initialUserState,
    dispatch: () => null,
});

export const useStore = () => useContext(AppContext);

interface Props {
    children: ReactNode;
}

const StoreProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(userReducers, initialUserState);

    const contextValue = useMemo(
        () => ({ state, dispatch }),
        [state, dispatch]
    );

    return (
        <>
            <AppContext.Provider value={contextValue}>
                {children}
            </AppContext.Provider>
        </>
    );
};

export default StoreProvider;
