import React, { useEffect, useState } from 'react';
import MyJobList from '../../components/userComponents/jobs/myJobList';
import { getEmployerDatab } from '../../service/user';
import SearchComp from '../../components/userComponents/jobs/searchComp';

const CreatedJobs = () => {

    const [verfication, setVerification] = useState('pending')
    const verifyEmployer = async () => {
        try {
            const employer = await getEmployerDatab()
            if (employer._id) {
                setVerification('success')
            } else {
                setVerification('failed')
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        verifyEmployer()
    }, [])
    return (
        <div className='w-full'>
            {/* <SearchComp /> */}
            <h1 className='p-6 text-3xl'>Manage Jobs</h1>
            <MyJobList />
        </div>
    );
}

export default CreatedJobs;
