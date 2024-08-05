import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import EmptyView from "../components/EmptyView";
import LoadingView from "../components/LoadingView";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import usePosts from "../hooks/usePosts";
import { generatePageTitle } from "../lib/utils";
import { searchState } from "../store";
import { Avatar } from "@mantine/core";

export default function Home() {
    const { user } = useAuth();
    const { posts, fetchingPosts } = usePosts();
    const search = useRecoilValue(searchState);

    return (
        <>
            <Helmet>
                <title>{generatePageTitle("Welcome")}</title>
            </Helmet>
            <main className="bg-gray-100 w-full min-h-screen gap-y-6">
                <Navbar />
                <div className="max-w-7xl mx-auto px-6">
                    {fetchingPosts && <LoadingView message="Fetching posts..." />}
                    {(posts && posts.length === 0) && <EmptyView message={`no posts available ${search.length ? `containing '${search}'` : ''}!`} />}
                    {(posts && posts.length > 0) && <div className="space-y-5">
                        {posts && posts.map((post: any) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                                <h1 className="text-xl font-semibold text-gray-800">{post.title}</h1>
                                <p className="text-gray-600 mt-2">{post.body}</p>
                                {/* author */}
                                <div className="flex items-center mt-4">
                                    <Avatar size="sm" alt={post.author.name} />
                                    <p className="text-gray-700 ml-2">{post.author.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>}

                </div>
            </main>
        </>
    )
}
