import React from 'react';
import MyButton from '../../ui/elements/myButton';
import { Outlet } from 'react-router-dom';

const JobStatus = () => {
    return (
        <div className='w-full'>
            <h1 className='w-full p-3 text-xl'>Applied Job</h1>
            <Outlet />
        </div>
    );
}

export default JobStatus;
