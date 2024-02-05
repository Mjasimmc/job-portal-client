import React, { useEffect, useState } from 'react';
import { getApplicantDataWithId } from '../../../service/manageJob';
import { useParams } from 'react-router-dom';
import MyButton from '../../../ui/elements/myButton';
// import ChatApplicant from '../manageJobs/ChatApplicant';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { socket } from '../../../socketIo';
import Loading from '../../../ui/LoadingPages/Loading';
import ChatEmployer from './chatEmployer';
import { BaseURL } from '../../../config_Api';

const ApplicantionForm = () => {
    const { applicantId } = useParams()
    const [applicantData, setApplicantData] = useState(null)
    const [showCV, setShowCV] = useState(false)

    const getData = async (applicantionId) => {
        try {
            const applicantDetails = await getApplicantDataWithId(applicantionId)
            console.log(applicantDetails)
            socket.emit('createRoom', applicantDetails.job_id.user)
            setApplicantData(applicantDetails)
        } catch (error) {
            toast.error('error occured on fetching data from server', toast_config)
        }
    }
    useEffect(() => {
        getData(applicantId)
    }, [applicantId, socket]);
    return (<>
        {!applicantData && <Loading />}
        {applicantData && <div className='p-2 flex-1 flex flex-col w-full  pb-[4rem]'>
            <div className="flex justify-between p-4">
                <p>{applicantData?.job_id?.role}</p>
                <p>status</p>
            </div>
            <h1 className='text-center text-3xl font-[350]'>Chat With Employer</h1>
            <div className="w-full p-2">
                <div className="border p-4 rounded-lg">
                    <div className="w-full flex flex-wrap justify-between items-center">
                        <h1 className='text-lg font-[450] underline'>Cover Letter <MyButton className='text-xs' onClick={() => setShowCV((prev) => !prev)}> {showCV ? "hide" : "show"} </MyButton> </h1>
                        <div className="flex flex-wrap gap-4">
                            <MyButton  onClick={() => {
                        window.open(BaseURL + "/uploads/" + applicantData.resume_id, '_blank');
                    }}>View shared Resume</MyButton>
                        </div>
                    </div>
                    {showCV && <p className='text-sm font-[350] p-2' style={{ whiteSpace: 'pre-line' }}> {applicantData?.coverLetter} </p>}
                </div>
            </div>
            <ChatEmployer userId={applicantData?.job_id.user} job={applicantData?.job_id} />

        </div>}
    </>);
}

export default ApplicantionForm;
