import { BlogPostType } from "../../types/BlogPost";
import * as CONSTANTS from "../constants/blog";

type BlogReducerState = {
    posts: BlogPostType[];
};

type Action = {
    type: string;
    posts?: BlogPostType[];
    post?: BlogPostType;
};

export const initialBlogState = {
    posts: [],
};

export const blogReducer = (state: BlogReducerState, action: Action) => {
    switch (action.type) {
        case CONSTANTS.GET_BLOG_POSTS:
            return { ...state, posts: action.posts };
        case CONSTANTS.EDIT_BLOG_POST:
            return {
                ...state,
                posts: state.posts.map((pst) =>
                    pst.id === action?.post?.id ? action.post : pst
                ),
            };
        case CONSTANTS.ADD_NEW_BLOG_POST:
            state.posts.unshift(action.post as BlogPostType);

            return { ...state, posts: state.posts };
        case CONSTANTS.CLEAR_STATE:
            return initialBlogState;
        default:
            return state;
    }
};
