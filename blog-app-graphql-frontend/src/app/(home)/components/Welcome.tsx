/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ThemeSwitcher } from '@/components/themeSwitcher';
import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const GET_POST = gql`
    query user {
        users {
            id
            email
        }
    }
`;

const SIGN_UP = gql`
    mutation signup($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            token
            userError
        }
    }
`;

const Welcome = () => {
    const { loading, error, data } = useQuery(GET_POST);

    const [userError, setUserError] = useState(null);
    const [
        signup,
        { data: dataSignUp, loading: loadingSignUp, error: errorSignUp }
    ] = useMutation(SIGN_UP);

    useEffect(() => {
        if (data && data?.signup && data?.signup?.token) {
            localStorage.setItem('token', data.signup.token);
        }
        if (data && data?.signup?.userError) {
            setUserError(data.signup.userError);
        }
    }, [data]);

    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    if (loadingSignUp) return 'Submitting...';
    if (errorSignUp) return `Submission error! ${errorSignUp.message}`;

    const handleRegister = (e: any) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            bio: e.target.bio.value
        };
        console.log('data: ', data);
        signup({
            variables: data,
            refetchQueries: [{ query: GET_POST }]
        });

        console.log(dataSignUp);
    };

    return (
        <div className='h-screen flex items-center flex-col justify-center'>
            <div className='flex mb-2 gap-4'>
                Change theme: <ThemeSwitcher />
            </div>
            <h1 className='text-primary-900'>Say! Hello </h1>

            {data.users.map((val: any) => (
                <div key={val?.id}>{val?.email}</div>
            ))}

            <br />

            <div className='form'>
                <form onSubmit={handleRegister}>
                    <label htmlFor=''>Your Name</label>
                    <input name='name' type='text' className='border mr-2' />
                    <label htmlFor=''>Your Email</label>
                    <input name='email' type='email' className='border mr-2' />
                    <label htmlFor=''>Your Password</label>
                    <input
                        name='password'
                        type='password'
                        className='border mr-2'
                    />
                    <label htmlFor=''>Your Bio</label>
                    <input name='bio' type='text' className='border mr-2' />
                    <button
                        type='submit'
                        className='rounded-full p-2 bg-blue-500 text-black'
                    >
                        Register
                    </button>
                </form>
            </div>

            <br className='py-4' />

            <Link href='/signin' className='border p-2 rounded'>
                Visit Login Page
            </Link>
            <Link href='/post' className='border p-2 rounded'>
                Visit Post Page
            </Link>
        </div>
    );
};

export default Welcome;
