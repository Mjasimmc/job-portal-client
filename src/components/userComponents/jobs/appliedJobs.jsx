import React, { useEffect, useState } from 'react';
import { getAllAppliedJobs } from '../../../service/userApplyJob';
import MyButton from '../../../ui/elements/myButton';
import { BaseURL } from '../../../config_Api';
import Loading from '../../../ui/LoadingPages/Loading';
import { useNavigate } from 'react-router-dom';

const AppliedJobs = () => {
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [load, setLoad] = useState(false)
    const getAllData = async () => {
        try {
            setLoad(true)
            const res = await getAllAppliedJobs()
            setApplications(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoad(false)
        }
    }
    const handleViewApplicantion = (id)=>{
        navigate('/applied/'+ id)
    }
    useEffect(() => {
        getAllData()
    }, [])
    return (<>
        {load && <Loading />}
        {!load && !applications.length && <div className='w-full aspect-[2] text-3xl p-4'>No Applied Jobs</div>}
        {!load && applications.length && <div className='w-full grid p-4 px-2 md:px-10 font-[300]'>
            <div className="grid gap-2 p-2">
                {applications.map((applicantion, i) => (
                    <div className="border flex gap-2 flex-wrap justify-between items-center p-2" key={applicantion._id}>
                        <div className="flex items-center gap-2 min-w-max">
                            <p>{i + 1} </p>
                            <p>{applicantion.job_id.role} </p>
                            <p className='text-xs bg-blue-300 max-w-max px-1 rounded'>Applied</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <MyButton onClick={() => {
                                window.open(BaseURL + "/uploads/" + applicantion.resume_id, '_blank');
                            }}>View Resume</MyButton>
                            <MyButton onClick={() => {
                                navigate('/job/view/' + applicantion.job_id._id)
                            }}>View Job</MyButton>
                            <MyButton onClick={()=>handleViewApplicantion(applicantion._id)}>View Application</MyButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>}
    </>
    );
}

export default AppliedJobs;
