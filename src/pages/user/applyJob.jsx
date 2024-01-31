import React, { useEffect, useState } from 'react';
import ApplyForm from '../../components/userComponents/applyJobs/applyForm';
import { getEmployeeData } from '../../service/user';
import Loading from '../../ui/LoadingPages/Loading';

const ApplyJob = () => {
    const [verfication, setVerification] = useState('pending')
    const verifyEmployer = async () => {
        try {
            const data = await getEmployeeData()
            
            if (data?.employee?._id) {
                
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
        <>
            {verfication == 'success' && <ApplyForm />}
            {verfication == 'failed' && <p className='p-5 md:px-16 text-xl'>Create Employee Profile for applying </p>}
            {verfication == 'pending' && <Loading />}
        </>
    );
}

export default ApplyJob;
