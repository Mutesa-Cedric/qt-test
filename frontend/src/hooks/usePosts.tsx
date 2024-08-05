import useSWR from "swr";
import axios from "../lib/axios.config";
import { Post } from "../types";

export default function usePosts() {
    const { data, error } = useSWR("/posts", async (url) => {
        const { data } = await axios(url);
        return data.posts as Post[];
    });

    return {
        posts: data,
        fetchingPosts: !error && !data,
        isError: error,
    };
}