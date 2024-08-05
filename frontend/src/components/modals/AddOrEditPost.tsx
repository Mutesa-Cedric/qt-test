import { Button, Input, Textarea } from '@mantine/core';
import React from 'react';
import { useRecoilState } from 'recoil';
import usePosts from '../../hooks/usePosts';
import { showAddOrEditPostModalState } from '../../store';
import ModalLayout from '../layouts/ModalLayout';

export default function AddOrEditPostModal() {
    const [show, setShow] = useRecoilState(showAddOrEditPostModalState);
    const { createPost, creatingPost, updatePost, updatingPost } = usePosts();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title') as string,
            content: formData.get('content') as string
        }

        if (show?.action === 'add') {
            createPost(data);
        } else if (show?.action === 'edit' && show.post) {
            updatePost({
                ...show.post,
                ...data
            });
        }
    }
    return (
        <ModalLayout
            open={Boolean(show?.show)}
            onClose={() => setShow(null)}
        >
            <h1 className="text-2xl font-semibold pb-4 capitalize">{show?.action} Post</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4">
                <div className='grid gap-2'>
                    <label htmlFor="title">Post Title</label>
                    <Input id="title" required min={2} name='title' placeholder="Post Title"
                        defaultValue={show?.post?.title}
                    />
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="content">Post Content</label>
                    <Textarea required id="content" name='content' placeholder="Post Content"
                        defaultValue={show?.post?.content}
                    />
                </div>

                <div className='flex w-full justify-end gap-4 pt-5'>
                    <Button
                        onClick={() => setShow(null)}
                        variant='outline'
                        color='gray'
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        loading={creatingPost || updatingPost}
                        disabled={creatingPost || updatingPost}
                    >
                        {show?.action === 'add' ? 'Add Post' : 'Update Post'}
                    </Button>
                </div>

            </form>

        </ModalLayout >
    )
}