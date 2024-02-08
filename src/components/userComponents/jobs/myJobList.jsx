import React, { useState } from 'react';
import JobCards from './jobCards';
import { employerGetJobData } from '../../../service/userJobMangement';
import { useEffect } from 'react';
import Loading from '../../../ui/LoadingPages/Loading';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';

const MyJobList = () => {
    const [jobs, setJobs] = useState([]);
    const [load, setLoad] = useState(false)

    const employerGetJob = async () => {
        try {
            setLoad(true)
            const jobData = await employerGetJobData()
            // console.log(jobData)
            setJobs(jobData)
        } catch (error) {
            // console.log(error)
            toast.error("server error",toast_config)
        } finally {
            setLoad(false)
        }
    }
    useEffect(() => {
        employerGetJob()
    }, []);
    return (<>
        {load && <Loading />}
        {!load && jobs.length === 0 && <p className='text-lg'>No Jobs Found</p>}
        {!load && <div className='w-full md:px-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 p-2 animate-cards' >
            {jobs.map((job, index) => (
                <JobCards index={index} key={job._id} job={job} />
            ))}
        </div>}
    </>
    );
}

export default MyJobList;
