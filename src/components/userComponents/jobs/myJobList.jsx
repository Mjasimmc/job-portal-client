import React, { useState } from 'react';
import JobCards from './jobCards';
import { employerGetJobData } from '../../../service/userJobMangement';
import { useEffect } from 'react';

const MyJobList = () => {
    const [jobs, setJobs] = useState([]);

    const employerGetJob = async ()=>{
        try {
            const jobData = await employerGetJobData()
            setJobs(jobData)
        } catch (error) {
            alert("server error")
        }
    }
    useEffect(() => {
        employerGetJob()
    }, []);
    return (
        <div className='w-full md:px-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 p-2'>
            
            {jobs.map((job) => (
                <JobCards key={job._id} job={job} />
            ))}
        </div>
    );
}

export default MyJobList;
