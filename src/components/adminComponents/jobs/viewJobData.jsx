import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobDetailsWithId } from '../../../service/userJobMangement';
import { UserMainContext } from '../../../store/contexts/userContext';
import MyButton from '../../../ui/elements/myButton';
import { useSelector } from 'react-redux';
import Loading from '../../../ui/LoadingPages/Loading';

const ViewJobData = () => {
    const navigate = useNavigate();
    const {
        pageNotFound,
        setPageNotFound,
        serverError,
        setServerError
    } = useContext(UserMainContext)
    const { jobId } = useParams();
    const [load, setLoad] = useState(false)
    const [jobData, setJobData] = useState(null);

    const getJobData = async () => {
        try {
            // setLoad(true)
            const job = await getJobDetailsWithId(jobId);
            // if (!job) {
            //     setPageNotFound(true);
            // }
            setJobData(job);
        } catch (error) {
            console.log(error)
            // if (!serverError) {
            //     return setServerError(true);
            // }
        } finally {
            // setLoad(false)

        }
    };


    const ViewDate = (date) => {
        const dateConvert = new Date(date);
        return dateConvert.toLocaleDateString();
    };
  
    useEffect(() => {
        getJobData(jobId);
    }, []);


    return (
        <>
            {load && <Loading />}
            {!load && <div className="w-full grid gap-[1rem] p-3  lg:px-[3rem] py-3 font-[350] ">
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

                                    <div className="w-full p-2 ">
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
                                    </div>
                                    <div className="w-full p-2  ">
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
                                    </div>
                                    <div className="w-full p-2  ">
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
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default ViewJobData;
