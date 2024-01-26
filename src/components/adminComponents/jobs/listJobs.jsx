import React, { useEffect, useState } from 'react';
import { getAllJobsFromServer } from '../../../service/userJobMangement';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import JobCardsAdmin from './jobCardsAdmin';
import { getAdminFilteredData } from '../../../service/admin/jobManagement';
import MyButton from '../../../ui/elements/myButton';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import Loading from '../../../ui/LoadingPages/Loading';

const ListJobs = () => {
    const location = useLocation();
    const [jobs, setJobs] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [load, setLoad] = useState(false)

    const getSearchQuery = () => {
        const queryParams = new URLSearchParams(location.search);
        return {
            role: queryParams.get('jobs') || '',
            company: queryParams.get('company') || '',
            location: queryParams.get('location') || '',
            jobTypes: queryParams.get('jobTypes') ? queryParams.get('jobTypes').split(',') : [],
            salarySort: queryParams.get('salarySort') || '',
            roleSort: queryParams.get('roleSort') || '',
            page: curPage,
        };
    };
    const getlistOfJobs = async () => {
        try {
            const search = getSearchQuery();
            setLoad(true)
            const filteredJobs = await getAdminFilteredData({ ...search });
            setJobs(filteredJobs);
        } catch (error) {
            console.log(error)
            toast.error('error occured on fetching jobs', toast_config)
        } finally{
            setLoad(false)
        }

    }
    const handlePageChange = (no)=>setCurPage(no)
    useEffect(() => {
        getlistOfJobs();
    }, [location, curPage]);
    return (<>
        <div className="w-full h-[4rem] flex justify-end px-10 items-center">
            <div className="flex gap-2">
                {curPage > 1 && <MyButton className=" !text-[.7rem] !font-[200]" onClick={() => handlePageChange(curPage - 1)} >
                    <ArrowLeftOutlined />
                </MyButton>}

                <MyButton className=" !text-[.7rem] !font-[200]" >
                    {curPage}
                </MyButton>
                {jobs.length > 9 && <MyButton className=" !text-[.7rem] !font-[200]" onClick={() => handlePageChange(curPage + 1)} >
                    <ArrowRightOutlined />
                </MyButton>}
            </div>
        </div>
        {load && <Loading />}
       {!load && <div className='w-full md:px-10 font-[400] grid sm:grid-cols-2 2xl:grid-cols-3 duration-1000 gap-6 p-2'>
            {jobs.map((job) => (
                <JobCardsAdmin key={job._id} job={job} />
            ))}
        </div>}
    </>
    );
}

export default ListJobs;
