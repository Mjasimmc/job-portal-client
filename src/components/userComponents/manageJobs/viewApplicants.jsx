import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllApplicantsOfJobWithJobId } from '../../../service/manageJob';
import MyButton from '../../../ui/elements/myButton';
import { BaseURL } from '../../../config_Api';
import AplicantListCard from './aplicantListCard';
import { userGetSelfPlanDetails } from '../../../service/subscription';

const ViewApplicants = () => {

    const { jobId } = useParams()
    const [applicants, setApplicants] = useState([])

    const [notValidPlan, setValidPlan] = useState(true)
    const getAllApplicants = async () => {
        try {
            const { plan } = await userGetSelfPlanDetails();
            console.log(plan)
            const expired = plan ? new Date(plan.expiryDate) < new Date() : false
            if (expired || !plan) {
                setValidPlan(false)
                return console.log('plan-not-valid', expired)
            }
            const res = await getAllApplicantsOfJobWithJobId(jobId)
            console.log(res)
            setApplicants(res)
        } catch (error) {
            toast.error('error occured on fetching data', toast_config)
        }
    }
    useEffect(() => {
        getAllApplicants()

    }, []);

    return (
        <div className='w-full'>
            {!notValidPlan && <div>
                <p className='text-xl'>No Valid Plan Found </p>

                <MyButton>Subscribe</MyButton>
            </div>}
            {notValidPlan && applicants.length === 0 && <p className='text-3xl'>No Applicants </p>}
            {notValidPlan && applicants.map((applicant, i) => (<Fragment key={applicant._id}>
                {<AplicantListCard applicant={applicant} i={i} />}
            </Fragment>
            ))}
        </div>
    );
}

export default ViewApplicants;
