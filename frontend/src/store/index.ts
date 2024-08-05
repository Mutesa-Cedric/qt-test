import { atom } from "recoil";
import { Post } from "../types";

export const searchState = atom({
    key: "searchState",
    default: "",
});

export const showAddOrEditPostModalState = atom<{
    show: boolean;
    action: "add" | "edit";
    post?: Post
} | null>({
    key: "PostActions",
    default: null,
});

export const showDeletePostModalState = atom<{
    show: boolean;
    post?: Post
} | null>({
    key: "DeletePost",
    default: null,
});

export const postViewState = atom<Post | null>({
    key: "PostView",
    default: null,
});