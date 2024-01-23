import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicantDataWithId } from '../../service/manageJob';
import MyButton from '../../ui/elements/myButton';
import ChatApplicant from '../../components/userComponents/manageJobs/ChatApplicant';
import { socket } from '../../socketIo';
import { toast } from 'react-toastify';
import { toast_config } from '../../config/constants';
import Loading from '../../ui/LoadingPages/Loading';

const ApplicantPage = () => {
    const { applicantId } = useParams()
    const [applicantData, setApplicantData] = useState(null)
    const [showCV, setShowCV] = useState(true)
    const getData = async () => {
        try {
            const applicantDetails = await getApplicantDataWithId(applicantId)
            console.log(applicantDetails.user._id)
            socket.emit('createRoom', applicantDetails.user._id)
            setApplicantData(applicantDetails)
        } catch (error) {
            console.log(error)
            toast.error('error occured on fetching data', toast_config)
        }
    }
    useEffect(() => {
        getData()
    }, [applicantId]);
    return (<>
        {!applicantData && <Loading />}
        {applicantData && <div className='p-2 flex-1 flex flex-col w-full   pb-[4rem]'>
            <div className="flex justify-between p-4">
                <p>{applicantData?.user.name}</p>
                <p>status</p>
            </div>
            <div className="w-full p-2">
                <div className="border p-4 rounded-lg">
                    <h1 className='text-lg font-[450] underline'>Cover Letter <MyButton className='text-xs' onClick={() => setShowCV((prev) => !prev)}> {showCV ? "hide" : "show"} </MyButton></h1>
                    {showCV && <p className='text-sm font-[350] p-2' style={{ whiteSpace: 'pre-line' }}> {applicantData?.coverLetter}
                        
                    </p>}
                    <div className="flex flex-wrap gap-4">
                        <MyButton>View Resume</MyButton>
                        <MyButton>View Profile</MyButton>
                    </div>
                </div>
            </div>
            <ChatApplicant userId={applicantData?.user._id} job={applicantData.job_id} />
        </div>}
    </>
    );
}

export default ApplicantPage;
