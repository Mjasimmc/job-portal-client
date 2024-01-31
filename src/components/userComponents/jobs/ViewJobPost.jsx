import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobDetailsWithId } from '../../../service/userJobMangement';
import { UserMainContext } from '../../../store/contexts/userContext';
import MyButton from '../../../ui/elements/myButton';
import { useSelector } from 'react-redux';
import Loading from '../../../ui/LoadingPages/Loading';
import { validateJobApplied } from '../../../service/userApplyJob';

const ViewJobPost = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user)
    const {
        pageNotFound,
        setPageNotFound,
        serverError,
        setServerError
    } = useContext(UserMainContext)
    const { jobId } = useParams();
    const [load, setLoad] = useState(false)
    const [jobData, setJobData] = useState(null);
    const [jobApplied, setJobApplied] = useState(false)
    const appliedJobValidate = async (_ID) => {

        if (!user.isLogin) return null
        const jobApplication = await validateJobApplied(_ID);
        setJobApplied(!!jobApplication)

    }
    const getJobData = async () => {
        try {
            setLoad(true)
            const job = await getJobDetailsWithId(jobId);
            if (!job) {
                setPageNotFound(true);
            }
            setJobData(job);
            appliedJobValidate(job._id)
        } catch (error) {
            console.log(error)
            if (!serverError) {
                return setServerError(true);
            }
        } finally {
            setLoad(false)

        }
    };


    const ViewDate = (date) => {
        const dateConvert = new Date(date);
        return dateConvert.toLocaleDateString();
    };
    const handleApplyJob = () => {
        navigate("/job/apply/" + jobData._id)
    }
    const handleManageJobs = () => {
        if (!user.isLogin) {
            return navigate('/auth/login')
        }
        navigate("/job/manage/" + jobData._id)
    }

    useEffect(() => {
        getJobData(jobId);
    }, []);


    return (
        <>
            {load && <Loading />}
            {!load && <div className="w-full grid gap-[1rem] p-3  lg:px-[3rem] py-3 font-[350] animate-cards">
                <div className="w-full p-4 border shadow rounded-xl">

                    <div className='w-full p-2 flex'>
                        <div className="w-full grid gap-4">
                            {jobData && (
                                <>
                                    <p className='text-2xl '>
                                        Opening For <strong className='uppercase'> {jobData?.role}</strong>
                                    </p>
                                    <div className="w-full p-4 grid gap-2 py-4 ">
                                        <div className='text-lg flex flex-wrap items-center gap-4'>
                                            <strong> Job Types : </strong>
                                            {jobData?.jobType.map((jobtype) => (
                                                <p className='px-2 text-sm cursor-pointer bg-green-500 rounded-full' key={jobtype}>{jobtype} </p>
                                            ))}
                                        </div>
                                        <p className='text-lg '>
                                            <strong> Qualification required : </strong> {jobData?.qualification}
                                        </p>
                                        <p className='text-lg '>
                                            <strong> Experience required : </strong> {jobData?.experience}
                                        </p>
                                        <p className='text-lg '>
                                            <strong> Salary : </strong> {jobData?.salary}
                                        </p>
                                        <p className='text-lg '>
                                            <strong> Vacancies : </strong> {jobData?.vacancy}
                                        </p>
                                        <p className='text-lg '>
                                            <strong> Applicants : </strong> {jobData?.applicants.length || 0}
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        {!jobApplied && jobData?.employer?.user !== user.id && <MyButton className="min-w-[8rem]" onClick={handleApplyJob}>Apply</MyButton>}
                                        {jobApplied && jobData?.employer?.user !== user.id && <MyButton className="min-w-[8rem]"  >Applied</MyButton>}
                                        {jobData.employer.user === user.id && <MyButton onClick={handleManageJobs} className="min-w-[8rem]">Manage</MyButton>}
                                    </div>
                                    <div className="w-full p-4 ">
                                        <p className='text-lg '>
                                            <strong> Company : </strong> {jobData?.companyName}
                                        </p>
                                        <p className='text-lg '>
                                            <strong> Company Email : </strong> {jobData?.contactEmail}
                                        </p>
                                        <p className='text-lg '>
                                            <strong> Location : </strong> {jobData?.location}
                                        </p>
                                        <p className='text-lg '>
                                            <strong> Last date : </strong> {ViewDate(jobData?.deadline)}
                                        </p>
                                    </div>
                                    <div className="w-full p-2 ">
                                        <p className='text-lg '>
                                            <strong> Description </strong>
                                        </p>
                                        <p className='p-2' style={{ whiteSpace: 'pre-line' }}>
                                            {jobData?.description}
                                        </p>
                                    </div>

                                    {!!jobData?.skills.length && <div className="w-full p-2 ">
                                        <p className='text-lg '>
                                            <strong> Skills </strong>
                                        </p>
                                        <div className="grid gap-1 p-3">
                                            {jobData?.skills.map((skill) => (
                                                <p key={skill} className='flex flex-wrap items-center'>
                                                    <ArrowRight /> {skill}
                                                </p>
                                            ))}
                                        </div>
                                    </div>}
                                    {!!jobData?.requirements.length && <div className="w-full p-2  ">
                                        <p className='text-lg '>
                                            <strong> Requirements </strong>
                                        </p>
                                        <div className="grid gap-1 p-3">
                                            {jobData?.requirements.map((requirement) => (
                                                <p key={requirement} className='flex flex-wrap items-center'>
                                                    <ArrowRight /> {requirement}
                                                </p>
                                            ))}
                                        </div>
                                    </div>}
                                    {!!jobData?.benefits.length && <div className="w-full p-2  ">
                                        <p className='text-lg '>
                                            <strong> Benefits </strong>
                                        </p>
                                        <div className="grid gap-1 p-3">
                                            {jobData?.benefits.map((benefit) => (
                                                <p key={benefit} className='flex flex-wrap items-center'>
                                                    <ArrowRight /> {benefit}
                                                </p>
                                            ))}
                                        </div>
                                    </div>}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default ViewJobPost;
