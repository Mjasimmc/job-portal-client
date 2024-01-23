// JobViewSubmit.js
import React, { useContext } from 'react';
import { JobCreateContext } from './createJobPostForm';
import { Button } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { createJobPost } from '../../../service/userJobMangement';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';

const JobViewSubmit = ({ setFormNumber }) => {
    const navigate = useNavigate()
    const { jobForm } = useContext(JobCreateContext);

    const ViewDate = (date) => {
        const dateConvert = new Date(date);
        return dateConvert.toLocaleDateString();
    };

    const handleSubmitJobPost = async () => {
        try {
            console.log(jobForm)
            const res = await createJobPost(jobForm)
            navigate('/job/success/'+res._id)
        } catch (error) {
           console.log(error)
           toast.error("error occured on submiting",toast_config)
        }
    }

    return (
        <>
            <div className="w-full  p-4 border  shadow  rounded-xl">
                <div className="-mb-[20px] w-full flex justify-end">
                    <Button onClick={() => setFormNumber(0)}>Edit </Button>
                </div>
                <div className='w-full p-2 flex'>
                    <div className="w-full  grid gap-4">
                        <p className='text-3xl uppercase'>
                             {jobForm?.role}
                        </p>
                        <div className="w-full p-4 grid gap-2 py-4 ">
                            <div className='text-lg flex flex-wrap items-center gap-4'>
                                <strong> Job Types : </strong>
                                {jobForm?.jobType.map((jobtype) => (
                                    <p className='px-2 text-sm  cursor-pointer bg-green-500 rounded-full' key={jobtype}>{jobtype} </p>
                                ))}
                            </div>
                            <p className='text-lg '>
                                <strong> Qaulification required : </strong> {jobForm?.qualification}
                            </p>
                            <p className='text-lg '>
                                <strong> Experience required : </strong> {jobForm?.experience}
                            </p>
                        </div>
                        <div className="w-full p-4 ">
                            <p className='text-lg '>
                                <strong> Company : </strong> {jobForm?.companyName}
                            </p>
                            <p className='text-lg '>
                                <strong> Company Email : </strong> {jobForm?.contactEmail}
                            </p>
                            <p className='text-lg '>
                                <strong> Location : </strong> {jobForm?.location}
                            </p>
                            <p className='text-lg '>
                                <strong> Salary : </strong> {jobForm?.salary}
                            </p>
                            <p className='text-lg '>
                                <strong> Last date : </strong> {ViewDate(jobForm?.deadline)}
                            </p>
                        </div>
                        <div className="w-full p-2 ">
                            <p className='text-lg '>
                                <strong> Description </strong>
                            </p>
                            <p className='p-2' style={{ whiteSpace: 'pre-line' }}>
                                {jobForm?.description}
                            </p>
                        </div>

                        <div className="w-full p-2 ">
                            <p className='text-lg '>
                                <strong> Skills </strong>
                            </p>
                            <div className="grid gap-1 p-3">
                                {jobForm?.skills.map((skill) => (
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
                                {jobForm?.requirements.map((requirement) => (
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
                                {jobForm?.benefits.map((benefit) => (
                                    <p key={benefit} className='flex flex-wrap items-center'>
                                        <ArrowRight /> {benefit}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="w-full p-2 ">
                            <div className="flex justify-end">
                                <Button onClick={handleSubmitJobPost} sx={{ paddingX: '20px', backgroundColor: '#f2f2f2', fontSize: '17px   ' }}>Proceed & Create</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobViewSubmit;
