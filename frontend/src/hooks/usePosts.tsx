/* eslint-disable react-hooks/exhaustive-deps */
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import axios from "../lib/axios.config";
import { postViewState, showAddOrEditPostModalState, showDeletePostModalState } from "../store";
import { Post, Comment } from "../types";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


export default function usePosts() {
    const { user } = useAuth();
    const [creatingPost, setCreatingPost] = useState(false);
    const [deletingPost, setDeletingPost] = useState(false);
    const [updatingPost, setUpdatingPost] = useState(false);
    const [addingComment, setAddingComment] = useState(false);
    const [, setShowAddOrEdit] = useRecoilState(showAddOrEditPostModalState);
    const [, setShowDelete] = useRecoilState(showDeletePostModalState);
    const navigate = useNavigate();
    const [postView, setPostView] = useRecoilState(postViewState);

    const { data: posts, isLoading, error, mutate } = useSWR<Post[]>("/posts", async (url) => {
        const { data } = await axios.get(url);
        return data.posts;
    });

    useEffect(() => {
        mutate();
    }, [])

    const createPost = async (post: Omit<Post, "id" | "createdAt" | "author" | "comments">) => {
        setCreatingPost(true);
        try {
            const { data } = await axios.post("/posts", post);
            if (data.success) {
                notifications.show({
                    title: "Success",
                    message: "Post created successfully",
                    color: "blue"
                });
                mutate([...posts ?? [], data.post]);
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
                navigate("/");
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
                setPostView(post);
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

    const addComment = async (comment: Omit<Comment, "id" | "author" | "createdAt">, postId: string) => {
        setAddingComment(true);
        try {
            const { data } = await axios.post(`/posts/${postId}/comments`, comment);
            if (data.success) {
                notifications.show({
                    title: "Success",
                    message: "Comment added successfully",
                    color: "blue"
                });
                mutate(posts?.map(p => {
                    if (p.id === postId) return data.post
                    return p;
                }));
                setPostView(data.post);
            }
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red"
            });
        } finally {
            setAddingComment(false);
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
        updatingPost,
        addComment,
        addingComment
    }

}