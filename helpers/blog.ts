import * as ACTIONS from "../contexts/actions/blog";
import { filterChangedKeys } from "./other";

export const fetchAllBlogPosts = (dispatch: any, limit: number, page: number) =>
    fetch(`/api/posts?limit=${limit}&page=${page}`)
        .then((resp) => resp.json())
        .then((resp) => dispatch(ACTIONS.getBlogPosts(resp.results)));

export const fetchPost = (id: string) =>
    fetch(`/api/posts/${id}`)
        .then((resp) => resp.json())
        .then(({ result }) => result);

export const editPost = (dispatch: any, oldPost: any, newPost: any) =>
    new Promise((resolve) => {
        const changedKeys = filterChangedKeys(oldPost, newPost);

        return (
            Object.keys(changedKeys).length > 0 &&
            fetch(`/api/posts/${newPost.id}/edit`, {
                method: "POST",
                body: JSON.stringify({ ...changedKeys, id: newPost?.id }),
            })
                .then((res) => res.json())
                .then(({ result: post }) => {
                    resolve(post);
                })
        );
    });

export const addNewPost = (dispatch: any, { title, body }: any) =>
    new Promise((resolve) =>
        fetch("/api/posts/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }),
        })
            .then((res) => res.json())
            .then(({ result: post }) => {
                fetchAllBlogPosts(dispatch, 20, 1);
                resolve(post);
            })
    );

export const deletePost = (id: string) =>
    new Promise((resolve) =>
        fetch(`/api/posts/${id}/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            resolve(true);
        })
    );
