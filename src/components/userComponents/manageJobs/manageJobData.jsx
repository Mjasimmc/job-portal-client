import React, { useState } from 'react';
import MyButton from '../../../ui/elements/myButton';
import { toast } from 'react-toastify';
import { stopRecruiting } from '../../../service/user/job';

const ManageJobData = ({ job }) => {
    const [recruitmentStatus, setRecruitmentStatus] = useState(job?.status)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    console.log(job)

    const ViewDate = (date) => {
        const dateConvert = new Date(date);
        return dateConvert.toLocaleDateString();
    };

    const handleStopRecruiting = async () => {
        try {
            if (isButtonDisabled) return null
            setIsButtonDisabled(true)
            const res = await stopRecruiting(job._id)
            setRecruitmentStatus(false)
            setIsButtonDisabled(false)
            toast.success("recruitment has stopped")
        } catch (error) {
            setIsButtonDisabled(false)
            console.log(error)
            toast.error("error occured on stop recruiting")
        }
    }
    const handleContinueRecruiting = async () => {
        try {
            if (isButtonDisabled) return null
            setIsButtonDisabled(true)
            const res = await stopRecruiting(job._id)
            setRecruitmentStatus(true)
            setIsButtonDisabled(false)
            toast.success("recruitment has continued")
        } catch (error) {
            setIsButtonDisabled(false)
            console.log(error)
            toast.error("error occured on stop recruiting")
        }
    }

    return (
        <div className="w-full min-h-20 border mt-10 flex flex-wrap justify-between items-center my-10 p-4 rounded-lg">
            <p>{job?.role}</p>
            <p> deadline : {ViewDate(job?.deadline)}</p>
            {recruitmentStatus && <MyButton className="px-4 border  border-[red]" onClick={handleStopRecruiting}> Stop Recruiting </MyButton>}
            {!recruitmentStatus && <MyButton className="px-4 border  border-[green]" onClick={handleContinueRecruiting} > Continue Recruiting  </MyButton>}
        </div>
    );
}

export default ManageJobData;
