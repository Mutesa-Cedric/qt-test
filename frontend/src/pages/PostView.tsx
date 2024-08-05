import { Button, Textarea } from '@mantine/core';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import LoadingView from '../components/LoadingView';
import MainLayout from '../components/layouts/MainLayout';
import useAuth from '../hooks/useAuth';
import axios from '../lib/axios.config';
import { generatePageTitle } from '../lib/utils';
import { postViewState, showAddOrEditPostModalState, showDeletePostModalState } from '../store';

export default function PostView() {
    const [post, setPost] = useRecoilState(postViewState)
    const [loading, setLoading] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const [comment, setComment] = React.useState("");
    const [, setShowAddOrEdit] = useRecoilState(showAddOrEditPostModalState);
    const [, setShowDelete] = useRecoilState(showDeletePostModalState);
    const { user } = useAuth();

    const fetchPost = async (postId: string) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/posts/${postId}`);
            setPost(data.post);
        } catch (error) {
            console.error(error);
            navigate("/");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const postId = location.pathname.split("/")[2];
        fetchPost(postId);
    }, [location.pathname]);

    return (
        <>
            <Helmet>
                <title>{generatePageTitle("View Post")}</title>
            </Helmet>

            <MainLayout>
                <div className='mt-5'>
                    <Link to="/" className='hover:text-blue-600'>&larr; Back to posts</Link>
                </div>
                {loading && <LoadingView message="Fetching post..." />}
                {(!loading && post) && <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                    <div>
                        <div className='flex w-full justify-between'>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-800 capitalize">{post.title}</h1>
                                <p className="text-gray-700 pb-4 text-sm ">by {post.author.name}</p>
                            </div>
                            <div>
                                {(user && user.id === post.author.id) && <div className='flex gap-x-2'>
                                    <Button
                                        onClick={() => {
                                            setShowAddOrEdit({ show: true, post, action: 'edit' });
                                        }}
                                        variant='outline'
                                        color='blue'
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setShowDelete({ show: true, post });
                                        }}
                                        variant='outline'
                                        color='red'
                                    >
                                        Delete
                                    </Button>
                                </div>}
                            </div>
                        </div>
                        <p className="text-gray-600 mt-2 bg-gray-50 p-3 mb-4">{post.content}</p>

                        <p className="text-sm text-gray-700 pt-4">posted at {new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                    <div className='pt-4'>
                        <h3 className=''>Comments ({post.comments.length})</h3>
                        <div className='mt-4'>
                            {
                                post.comments.length === 0 &&
                                <p className='text-gray-800'>No comments yet</p>
                            }
                            {(post.comments.length > 0) && post.comments.map((comment) => (
                                <div key={comment.id} className='bg-gray-100 p-4 rounded-lg mt-2 border'>
                                    <p className='text-gray-800'>{comment.content}</p>
                                    <p className='text-gray-600 text-sm mt-2'>by {comment.author.name}</p>
                                </div>
                            ))}
                        </div>
                        {user && <div className='flex gap-x-2 items-center mt-5'>
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment"
                                className='w-full'
                            ></Textarea>
                            <Button onClick={() => {
                                console.log("Comment", comment);
                            }}>Add</Button>
                        </div>}
                    </div>
                </div>}
            </MainLayout>
        </>
    )
}
