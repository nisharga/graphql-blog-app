'use client';
import { gql, useMutation } from '@apollo/client';

import React, { useEffect, useState } from 'react';

const CREATE_POST = gql`
    mutation addPost($post: PostInput!) {
        addPost(post: $post) {
            post {
                id
                title
                content
                published
            }
            userError
        }
    }
`;
// ... keep your CREATE_POST mutation definition ...

const AddPost = () => {
    const [token, setToken] = useState<string | null>(null);
    const [createPost, { data, loading, error }] = useMutation(CREATE_POST);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        setToken(storedToken);
    }, []);

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const payload = {
            title: form.title?.value,
            content: form.content.value
        };

        try {
            await createPost({
                variables: { post: payload }
            });

            if (data.addPost.userError) {
                setSubmissionError(data.addPost.userError);
            } else {
                // Clear form and errors on successful submission
                form.reset();
                setSubmissionError(null);
                // Optional: Add redirect or success message
            }
        } catch (err) {
            // Apollo errors are handled here
            console.error(err);
        }
    };
    console.log(data);
    return (
        <div>
            {token ? (
                <form onSubmit={handleCreatePost}>
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

                    {/* Error displays */}
                    {submissionError && (
                        <p className='text-red-500'>{submissionError}</p>
                    )}
                    {error && (
                        <p className='text-red-500'>Error: {error.message}</p>
                    )}
                </form>
            ) : (
                <div className=''></div>
            )}
        </div>
    );
};

export default AddPost;
