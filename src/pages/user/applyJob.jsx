import React, { useEffect, useState } from 'react';
import ApplyForm from '../../components/userComponents/applyJobs/applyForm';
import { getEmployeeData } from '../../service/user';
import Loading from '../../ui/LoadingPages/Loading';
import WarnCreateEmployer from '../errorPages/warnCreateEmployer';

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
            {verfication == 'failed' && <WarnCreateEmployer>Create Employee Profile <br /> for applying </WarnCreateEmployer>}
            {verfication == 'pending' && <Loading />}
        </>
    );
}

export default ApplyJob;
