import React, { useEffect, useState } from 'react';
import { getAllJobsFromServer } from '../../../service/userJobMangement';
import JobCards from './jobCards';
import { useLocation } from 'react-router-dom';
import MyButton from '../../../ui/elements/myButton';
import Loading from '../../../ui/LoadingPages/Loading';
import { ArrowLeftOutlined, ArrowRightAltOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ListJobs = () => {
    const userLogin = useSelector(state => state.user.isLogin)
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

    const getAllJobs = async () => {
        try {
            const search = getSearchQuery();
            setLoad(true)
            const filteredJobs = await getAllJobsFromServer({ ...search },userLogin);
            setLoad(false)
            setJobs(filteredJobs);
        } catch (error) {
            console.log(error);
            setLoad(false)
        } 
    };

    const handlePageChange = (newPage) => {
        setCurPage(newPage);
    };

    useEffect(() => {
        getAllJobs();
    }, [location, curPage , userLogin]);
    return (
        <div className='flex-1 flex w-full flex-col justify-between '>
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
            {!load && <div className='w-full md:px-10 font-[400] grid md:grid-cols-2 xl:grid-cols-3 gap-5 p-2'>
                {jobs.map((job ,index) => (
                    <JobCards index={index} key={job._id} job={job} />
                ))}
            </div>}
            <div className="w-full h-[4rem] flex justify-center items-center">
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
        </div>
    );
};

export default ListJobs;
