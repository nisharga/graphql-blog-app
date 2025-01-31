/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const LOGIN = gql`
    mutation signIn($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            token
            userError
        }
    }
`;

const LoginForm = () => {
    const router = useRouter();
    const [signin, { data, loading, error }] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const token = data?.signin?.token;
            if (token) {
                sessionStorage.setItem('authToken', token);
                router.push('/post');
            }
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    const handleRegister = (e: any) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        };
        signin({
            variables: data
        });
    };

    console.log(data?.signin?.token); // getting token here
    return (
        <div>
            <div className='form'>
                <form onSubmit={handleRegister}>
                    <label htmlFor=''>Your Email</label>
                    <input name='email' type='email' className='border mr-2' />
                    <label htmlFor=''>Your Password</label>
                    <input
                        name='password'
                        type='password'
                        className='border mr-2'
                    />

                    <button
                        type='submit'
                        className='rounded-full p-2 bg-blue-500 text-black'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
