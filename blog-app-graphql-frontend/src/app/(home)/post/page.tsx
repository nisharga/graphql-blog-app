import React from 'react';
import AddPost from './components/AddPost';
import AllPost from './components/AllPost';

const page = () => {
    return (
        <div className='py-12 px-12'>
            {' '}
            <AddPost />
            <AllPost />
        </div>
    );
};

export default page;
