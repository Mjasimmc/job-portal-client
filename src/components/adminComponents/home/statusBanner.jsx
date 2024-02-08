import React, { useEffect, useState } from 'react';
import MyButton from '../../../ui/elements/myButton';
import { getDashBoardData } from '../../../service/admin/admin';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import Loading from '../../../ui/LoadingPages/Loading';

const StatusBanner = () => {
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAllData = async () => {
        try {
            const res = await getDashBoardData();
            
            // console.log(res);
            toast.success('Fetched data successfully', toast_config);
            setCount(res);
        } catch (error) {
            console.error(error);
            toast.error('Error on fetching data', toast_config);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllData();
        
    }, []); // Run only once when component mounts

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="border grid sm:grid-cols-2 lg:grid-cols-4 rounded-md animate-cards  ">
            <div className="border p-4 text-center grid gap-3">
                <p className='text-md font-[350]'>No Of Users</p>
                <p className='text-center text-2xl'>{count?.users} </p>
                
            </div>
            <div className="border p-4  text-center grid gap-3">
                <p className='text-md font-[350]'>No Of Job Posts</p>
                <p className='text-center text-2xl'>{count?.jobs}</p>
                
            </div>
            <div className="border p-4  text-center grid gap-3 ">
                <p className='text-md font-[350]'>Active Subscription Users</p>
                <p className='text-center text-2xl'>{count?.userSubscribed}</p>
                
            </div>
            <div className="border p-4  text-center grid gap-3">
                <p className='text-md text-center font-[350]'>Last 30 days Purchase</p>
                <p className='text-center text-2xl'><span className='text-[1rem]' >RS:</span> {count?.lastMonthTotalPayment}</p>
                
            </div>
        </div>
    );
};

export default StatusBanner;
