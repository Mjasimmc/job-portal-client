
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getEmployerDatab } from '../../service/user';
import Loading from '../../ui/LoadingPages/Loading';





const CreateJobPostForm = lazy(() => import('../../components/userComponents/createJob/createJobPostForm'))
const WarnCreateEmployer = lazy(() => import('../errorPages/warnCreateEmployer'))
const JobPostForm = () => {
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
            setVerification('failed')
        }
    }
    useEffect(() => {
        verifyEmployer()
    }, [])

    return (<>

        <div className='w-full grid gap-4 p-3 px-[5%]'>

            <Suspense fallback={<Loading />} >

                {verfication == 'success' && <CreateJobPostForm />}
                {verfication == 'failed' && (<WarnCreateEmployer>Create Employer Profile for <br /> Create Jobs</WarnCreateEmployer>)}
                {verfication == 'pending' && <Loading />}
            </Suspense>
        </div>
    </>
    );
}

export default JobPostForm;
