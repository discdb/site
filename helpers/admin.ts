import * as ACTIONS from "../contexts/actions/admin";
import { CreatedByType } from "../types/User";
import { filterChangedKeys } from "./other";

export const editUser = (dispatch: any, oldUser: any, usr: any) =>
    new Promise((resolve) => {
        const changedKeys = filterChangedKeys(oldUser, usr);

        return (
            Object.keys(changedKeys).length > 0 &&
            fetch("/api/admin/users/edit", {
                method: "POST",
                body: JSON.stringify({ ...changedKeys, id: usr?.id }),
            })
                .then((res) => res.json())
                .then(({ result: user }) => {
                    dispatch(ACTIONS.editUser(user));
                    resolve(user);
                })
        );
    });

export const getAllUsers = (dispatch: any) =>
    fetch("/api/admin/users")
        .then((res) => res.json())
        .then(({ results: users }) => dispatch(ACTIONS.getAllUsers(users)));

export const getAllImages = (dispatch: any) =>
    fetch("/api/admin/images")
        .then((res) => res.json())
        .then(({ results: images }) => dispatch(ACTIONS.getAllImages(images)));

export const deleteImage = ({
    fileName,
    uploadedBy,
}: {
    fileName: string;
    uploadedBy: CreatedByType;
}) =>
    fetch("/api/admin/images", {
        method: "DELETE",
        body: JSON.stringify({ fileName, uploadedBy: uploadedBy.id }),
    }).then(
        async (res) =>
            res.status !== 200 && new Error((await res.json()).message)
    );
