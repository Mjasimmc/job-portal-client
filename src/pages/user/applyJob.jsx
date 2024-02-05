import React, { useEffect, useState } from 'react';
import ApplyForm from '../../components/userComponents/applyJobs/applyForm';
import { getEmployeeData } from '../../service/user';
import Loading from '../../ui/LoadingPages/Loading';
import { toast_config } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

const ApplyJob = () => {
    const navigate =  useNavigate()
    const [verfication, setVerification] = useState('pending')
    const verifyEmployer = async () => {
        try {
            const data = await getEmployeeData()
            
            if (data?.employee?._id) {
                setVerification('success')
            } else {
                navigate('/profile/edit-profile-data')
                setVerification('failed')
            }
        } catch (error) {
            toast.error('error occured',toast_config)
            navigate(-1)
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
