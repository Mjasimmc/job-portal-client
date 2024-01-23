import React from 'react';
import MyButton from '../../../ui/elements/myButton';

const StatusBanner = () => {
    return (

        <div className="border grid  sm:grid-cols-2  lg:grid-cols-4 rounded-md">
            <div className="border p-4 grid gap-3">
                <p className='text-md font-[350]'>No Of Users</p>
                <p className='text-center text-2xl'>99</p>
                <MyButton>View</MyButton>
            </div>
            <div className="border p-4 grid gap-3">
                <p className='text-md font-[350]'>No Of Job Posts</p>
                <p className='text-center text-2xl'>99</p>
                <MyButton>View</MyButton>
            </div>
            <div className="border p-4 grid gap-3 ">
                <p className='text-md font-[350]'>No Of users With Subscription Plan</p>
                <p className='text-center text-2xl'>99</p>
                <MyButton>View</MyButton>
            </div>
            <div className="border p-4 grid gap-3">
                <p className='text-md font-[350]'>Subscription Plans</p>
                <p className='text-center text-2xl'>99</p>
                <MyButton>View</MyButton>
            </div>
        </div>
    );
}

export default StatusBanner;
