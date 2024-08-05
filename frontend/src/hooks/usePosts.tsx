/* eslint-disable react-hooks/exhaustive-deps */
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import axios from "../lib/axios.config";
import { showAddOrEditPostModalState, showDeletePostModalState } from "../store";
import { Post } from "../types";
import useAuth from "./useAuth";


export default function usePosts() {
    const { user } = useAuth();
    const [creatingPost, setCreatingPost] = useState(false);
    const [deletingPost, setDeletingPost] = useState(false);
    const [updatingPost, setUpdatingPost] = useState(false);
    const [, setShowAddOrEdit] = useRecoilState(showAddOrEditPostModalState);
    const [, setShowDelete] = useRecoilState(showDeletePostModalState);

    const { data: posts, isLoading, error, mutate } = useSWR<Post[]>("/posts", async (url) => {
        if (!user) return;
        const { data } = await axios.get(url);
        return data.posts;
    });

    useEffect(() => {
        mutate();
    }, [user])

    const createPost = async (post: Omit<Post, "id" | "createdAt"|"author">) => {
        setCreatingPost(true);
        try {
            const { data } = await axios.post("/posts", post);
            if (data.success) {
                notifications.show({
                    title: "Success",
                    message: "Post created successfully",
                    color: "blue"
                });
                mutate([...posts || [], data.post]);
                setShowAddOrEdit(null);
            } else {
                notifications.show({
                    title: "Error",
                    message: "An error occurred",
                    color: "red"
                });
            }
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red"
            });
        } finally {
            setCreatingPost(false);
        }
    }

    const deletePost = async (id: string) => {
        setDeletingPost(true);
        try {
            const { data } = await axios.delete(`/posts/${id}`);
            if (data.success) {
                notifications.show({
                    title: "Success",
                    message: "Post deleted successfully",
                    color: "blue"
                });
                mutate(posts?.filter(post => post.id !== id));
                setShowDelete(null);
            } else {
                notifications.show({
                    title: "Error",
                    message: "An error occurred",
                    color: "red"
                });
            }
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red"
            });
        } finally {
            setDeletingPost(false);
        }
    }

    const updatePost = async (post: Post) => {
        setUpdatingPost(true);
        try {
            const { data } = await axios.put(`/posts/${post.id}`, post);
            if (data.success) {
                notifications.show({
                    title: "Success",
                    message: "Post updated successfully",
                    color: "blue"
                });
                mutate(posts?.map(p => p.id === post.id ? post : p));
                setShowAddOrEdit(null);
            } else {
                notifications.show({
                    title: "Error",
                    message: "An error occurred",
                    color: "red"
                });
            }
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red"
            });
        } finally {
            setUpdatingPost(false);
        }
    }

    return {
        posts,
        fetchingPosts: isLoading,
        error,
        createPost,
        deletePost,
        updatePost,
        creatingPost,
        deletingPost,
        updatingPost
    }

}