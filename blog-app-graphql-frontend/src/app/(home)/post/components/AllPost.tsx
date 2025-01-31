'use client';
import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';

const POSTS = gql`
    query posts {
        posts {
            id
            title
        }
    }
`;

const UPDATE_POST = gql`
    mutation updatePost($postId: ID!, $post: PostInput!) {
        updatePost(postId: $postId, post: $post) {
            post {
                title
                content
            }
            userError
        }
    }
`;

const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId) {
            post {
                id
            }
        }
    }
`;

const AllPost = () => {
    const { loading, error, data } = useQuery(POSTS);
    const [
        updatePost,
        { data: updateData, loading: loadingUpdate, error: updateError }
    ] = useMutation(UPDATE_POST);

    const [deletePost, { loading: deleting, error: deleteError }] = useMutation(
        DELETE_POST,
        {
            refetchQueries: [{ query: POSTS }] // Auto-refresh posts after deletion
        }
    );

    const handleUpdatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        try {
            await updatePost({
                variables: {
                    postId: form.id?.value,
                    post: {
                        title: form.title?.value,
                        content: form.content.value
                    }
                },
                refetchQueries: [{ query: POSTS }]
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deletePost({
                variables: { postId: id }
            });
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    return (
        <div className='mb-8'>
            <h2 className='text-2xl'>All Posts:</h2> <br></br>
            {data?.posts?.map((val) => (
                <div key={val?.id} className='flex gap-2'>
                    <h2>
                        {val?.id}-{val?.title}
                    </h2>
                    <button onClick={() => handleDelete(val?.id)}>
                        Delete
                    </button>
                </div>
            ))}
            <h2 className='text-2xl mt-8'>Edit Posts:</h2> <br></br>
            <form onSubmit={handleUpdatePost}>
                <label htmlFor='title'>Your Id</label>
                <input name='id' type='text' className='border mr-2' />

                <label htmlFor='title'>Your title</label>
                <input name='title' type='text' className='border mr-2' />

                <label htmlFor='content'>Your content</label>
                <input name='content' type='text' className='border mr-2' />

                <button
                    type='submit'
                    className='rounded-full p-2 bg-blue-500 text-black'
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default AllPost;
