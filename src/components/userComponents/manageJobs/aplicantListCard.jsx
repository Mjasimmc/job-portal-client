import React from 'react';
import MyButton from '../../../ui/elements/myButton';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../../../config_Api';

const AplicantListCard = ({ applicant, i }) => {
    const navigate = useNavigate()
    const handleViewApplicant = () => {
        navigate('/job/applicant/' + applicant.applicantionId._id)
    }
    return (
        <>
            <div className="w-full flex flex-wrap justify-between items-center" >
                <div className="flex gap-4">
                    <p>{i + 1} </p>
                    <p>{applicant.user.name} </p>
                </div>
                <div className="flex gap-4 flex-wrap">
                    <MyButton onClick={() => {
                        window.open(BaseURL + "/uploads/" + applicant.resume_id, '_blank');
                    }}>View Resume</MyButton>
                    <MyButton onClick={handleViewApplicant}>View Applicantion</MyButton>
                </div>
            </div>

        </>
    );
}

export default AplicantListCard;
