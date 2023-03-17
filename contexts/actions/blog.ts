import { BlogPostType } from "../../types/BlogPost";
import * as CONSTANTS from "../constants/blog";

export const getBlogPosts = (posts: BlogPostType[]) => ({
    type: CONSTANTS.GET_BLOG_POSTS,
    posts,
});

export const editBlogPost = (post: BlogPostType) => ({
    type: CONSTANTS.EDIT_BLOG_POST,
    post,
});

export const addNewBlogPost = (post: BlogPostType) => ({
    type: CONSTANTS.ADD_NEW_BLOG_POST,
    post,
});
