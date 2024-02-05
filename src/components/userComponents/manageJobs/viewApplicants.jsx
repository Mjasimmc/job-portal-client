import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllApplicantsOfJobWithJobId } from '../../../service/manageJob';

import AplicantListCard from './aplicantListCard';
import { userGetSelfPlanDetails } from '../../../service/subscription';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import ListSubscriptionPlan from '../subscription/listSubscriptionPlan';
import Loading from '../../../ui/LoadingPages/Loading';

const ViewApplicants = ({ applicants }) => {


    return (<>
        <div className='w-full border p-4 rounded-lg flex-1 flex flex-col gap-4'>
            {applicants?.length > 0 && <p className='text-3xl py-4'>Applicant List </p>}
            {applicants?.length === 0 && <p className='text-3xl'>No Applicants </p>}
            {applicants?.map((applicant, i) => (<Fragment key={applicant._id}>
                {<AplicantListCard applicant={applicant} i={i} />}
            </Fragment>
            ))}
        </div>
    </>
    );
}

export default ViewApplicants;
