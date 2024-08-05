import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import EmptyView from "../components/EmptyView";
import MainLayout from "../components/layouts/MainLayout";
import LoadingView from "../components/LoadingView";
import usePosts from "../hooks/usePosts";
import { generatePageTitle } from "../lib/utils";
import { searchState } from "../store";
import { Post } from "../types";

export default function Home() {
    const { posts, fetchingPosts } = usePosts();
    const search = useRecoilValue(searchState);


    return (
        <>
            <Helmet>
                <title>{generatePageTitle("Welcome")}</title>
            </Helmet>
            <MainLayout>
                {fetchingPosts && <LoadingView message="Fetching posts..." />}
                {(posts && posts.length === 0) && <EmptyView message={`no posts available ${search.length ? `containing '${search}'` : ''}!`} />}
                {(posts && posts.length > 0) && <div className="space-y-5 pt-6">
                    <h2 className="font-semibold text-2xl text-gray-700">Recent Posts</h2>
                    {posts && posts.map((post: any) => (
                        <PostCard post={post} />
                    ))}
                </div>}
            </MainLayout>
        </>
    )
}


const PostCard = ({ post }: { post: Post }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/post/${post.id}`)}
            key={post.id} className="bg-white rounded-lg shadow-md p-6 border border-transparent hover:border-blue-100 cursor-pointer">
            <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
            <p className="text-gray-700 pb-4 text-sm ">by {post.author.name}</p>
            <p className="text-gray-600 mt-2 bg-gray-50 p-3 mb-4">{post.content}</p>

            <p className="text-sm text-gray-700 pt-4">posted at {new Date(post.createdAt).toLocaleString()}</p>
        </div>
    )

}