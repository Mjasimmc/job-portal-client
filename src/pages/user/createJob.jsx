
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getEmployerDatab } from '../../service/user';
import Loading from '../../ui/LoadingPages/Loading';
import { userGetSelfPlanDetails } from '../../service/subscription';
import { toast } from 'react-toastify';
import { toast_config } from '../../config/constants';
import { useNavigate } from 'react-router-dom';
import ListSubscriptionPlan from '../../components/userComponents/subscription/listSubscriptionPlan';





const CreateJobPostForm = lazy(() => import('../../components/userComponents/createJob/createJobPostForm'))


const JobPostForm = () => {
    const navigate = useNavigate()
    const [verfication, setVerification] = useState('pending')
    const verifyEmployer = async () => {
        try {
            const employer = await getEmployerDatab()
            const { plan } = await userGetSelfPlanDetails();
            const expired = plan ? new Date(plan.expiryDate) < new Date() : false
            if (expired || !plan) {
                toast.error('no valid plan found',toast_config)
                return setVerification('plan-not-valid')
            }
            if (employer._id) {
                return setVerification('success')
            }
            navigate('/profile/edit-company-data')
        } catch (error) {
            // console.log(error)
            // setVerification('failed')
            navigate('/profile/edit-company-data')
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
                {verfication == 'plan-not-valid' &&  <ListSubscriptionPlan />}
                {verfication == 'pending' && <Loading />}
            </Suspense>
        </div>
    </>
    );
}

export default JobPostForm;
