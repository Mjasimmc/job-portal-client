
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getEmployerDatab } from '../../service/user';
import Loading from '../../ui/LoadingPages/Loading';
import { userGetSelfPlanDetails } from '../../service/subscription';





const CreateJobPostForm = lazy(() => import('../../components/userComponents/createJob/createJobPostForm'))


const JobPostForm = () => {
    const [verfication, setVerification] = useState('pending')
    const verifyEmployer = async () => {
        try {
            const employer = await getEmployerDatab()
            const { plan } = await userGetSelfPlanDetails();
            console.log(plan)
            const expired = plan ? new Date(plan.expiryDate) < new Date() : false
            if (expired || !plan) {
                return setVerification('plan-not-valid')
            }
            if (employer._id) {
                return setVerification('success')
            }

            setVerification('failed')
        } catch (error) {
            console.log(error)
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
                {verfication == 'failed' && (<p className=' p-5 text-xl'>Create Employer Profile for <br /> Create Jobs</p>)}
                {verfication == 'plan-not-valid' && (<p className=' p-5 text-xl'>No Valid Plan Found</p>)}
                {verfication == 'pending' && <Loading />}
            </Suspense>
        </div>
    </>
    );
}

export default JobPostForm;
