import React, { useEffect, useState } from 'react';
import MyJobList from '../../components/userComponents/jobs/myJobList';
import { getEmployerDatab } from '../../service/user';
import SearchComp from '../../components/userComponents/jobs/searchComp';
import UserSubscriptionData from '../../components/userComponents/subscription/userSubscriptionData';

const CreatedJobs = () => {

    // const [verfication, setVerification] = useState('pending')
    // const verifyEmployer = async () => {
    //     try {
    //         const employer = await getEmployerDatab()
    //         if (employer._id) {
    //             setVerification('success')
    //         } else {
    //             setVerification('failed')
    //         }
    //     } catch (error) {

    //     }
    // }
    // useEffect(() => {
    //     verifyEmployer()
    // }, [])
    return (
        <div className='w-full'>
            <h1 className='p-6 pt-2  text-3xl'>Manage Jobs</h1>
            <MyJobList />
        </div>
    );
}

export default CreatedJobs;
