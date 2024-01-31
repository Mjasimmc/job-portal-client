import React, { useState } from 'react';
import JobCards from './jobCards';
import { employerGetJobData } from '../../../service/userJobMangement';
import { useEffect } from 'react';
import Loading from '../../../ui/LoadingPages/Loading';

const MyJobList = () => {
    const [jobs, setJobs] = useState([]);
    const [load, setLoad] = useState(false)

    const employerGetJob = async () => {
        try {
            setLoad(true)
            const jobData = await employerGetJobData()
            setJobs(jobData)
        } catch (error) {
            alert("server error")
        } finally {
            setLoad(false)
        }
    }
    useEffect(() => {
        employerGetJob()
    }, []);
    return (<>
        {load && <Loading />}
        {jobs.length === 0 && <p className='text-lg'>No Jobs Found</p>}
        {!load && <div className='w-full md:px-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 p-2 animate-cards' >

            {jobs.map((job, index) => (
                <JobCards index={index} key={job._id} job={job} />
            ))}
        </div>}
    </>
    );
}

export default MyJobList;
