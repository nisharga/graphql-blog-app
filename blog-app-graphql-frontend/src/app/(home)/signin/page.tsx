import React from 'react';
import LoginForm from './components/LoginForm';
import { ThemeSwitcher } from '@/components/themeSwitcher';

const page = () => {
    return (
        <div className='p-12'>
            <div className='flex mb-2 gap-4'>
                Change theme: <ThemeSwitcher />
            </div>
            <LoginForm />
        </div>
    );
};

export default page;
