import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllApplicantsOfJobWithJobId } from '../../../service/manageJob';
import MyButton from '../../../ui/elements/myButton';
import { BaseURL } from '../../../config_Api';
import AplicantListCard from './aplicantListCard';

const ViewApplicants = () => {

    const { jobId } = useParams()
    const [applicants, setApplicants] = useState([])
    const getAllApplicants = async () => {
        try {
            const res = await getAllApplicantsOfJobWithJobId(jobId)
            console.log(res)
            setApplicants(res)
        } catch (error) {

        }
    }
    useEffect(() => {
        getAllApplicants()

    }, []);

    return (
        <div className='w-full'>
            {applicants.length === 0 && <p className='text-3xl'>No Applicants </p>}
            {applicants.map((applicant, i) => (<Fragment key={applicant._id}>
               {<AplicantListCard applicant={applicant} i={i} />}
            </Fragment>
            ))}
        </div>
    );
}

export default ViewApplicants;
