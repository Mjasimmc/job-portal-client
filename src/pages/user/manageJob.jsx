import React, { useEffect, useState } from 'react';
import ViewApplicants from '../../components/userComponents/manageJobs/viewApplicants';
import { useParams } from 'react-router-dom';
import { employerGetJobData } from '../../service/user/job';
import { userGetSelfPlanDetails } from '../../service/subscription';
import { getAllApplicantsOfJobWithJobId } from '../../service/manageJob';
import { toast } from 'react-toastify';
import { toast_config } from '../../config/constants';
import ListSubscriptionPlan from '../../components/userComponents/subscription/listSubscriptionPlan';
import Loading from '../../ui/LoadingPages/Loading';
import Error404 from '../errorPages/error404';
import ManageJobData from '../../components/userComponents/manageJobs/manageJobData';

const ManageJob = () => {
    const { jobId } = useParams()
    const [pageNotFount, setPageNotFound] = useState(false)
    const [jobData, setJobData] = useState(null)
    const [load, setLoad] = useState(false)
    const [notValidPlan, setValidPlan] = useState(true)

    const getAllApplicants = async () => {
        try {
            setLoad(true)
            const { plan } = await userGetSelfPlanDetails();
            const expired = plan ? new Date(plan.expiryDate) < new Date() : false
            if (expired || !plan) {
                setValidPlan(false)
                setLoad(false)
                return toast.error('no valid plan found', toast_config)
            }
            const res = await getAllApplicantsOfJobWithJobId(jobId)
            setLoad(false)
            if (!res) return setPageNotFound(true)
            setJobData(res)
        } catch (error) {
            setPageNotFound(true)
            console.log(error)
            setLoad(false)
            toast.error('error occured on fetching data', toast_config)
        }
    }
    useEffect(() => {
        getAllApplicants()

    }, [jobId]);


    return (<>
        {pageNotFount && <Error404 />}
        {load && <Loading />}
        {!notValidPlan && <>
            <ListSubscriptionPlan />
        </>}
        {!load && notValidPlan && !pageNotFount &&
            <div className='w-full p-2 md:px-10 flex flex-col flex-1'>
                <ManageJobData job={jobData} />
              
                <ViewApplicants applicants={jobData?.applicants || []} />
            </div>
        }
    </>
    );
}

export default ManageJob;
