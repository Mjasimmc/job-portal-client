import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Filter, Search, RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import MyButton from '../../../ui/elements/myButton';
import { useSelector } from 'react-redux';
import InputTextField from '../../../ui/elements/InputTextField';

const AdminSearchJobs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const [showFilter, setShowFilter] = useState(false);
    const jobTypes = useMemo(() => [
        'Part-Time',
        'Full-Time',
        'Freelance',
        'Internship',
        'Remote',
    ], []);

    const [searchParams, setSearchParams] = useState({
        jobs: '',
        company: '',
        location: '',
    });

    const [filterParams, setFilterParams] = useState({
        jobTypes: [],
        salarySort: '',
        roleSort: '',
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setSearchParams({
            jobs: queryParams.get('jobs') || '',
            company: queryParams.get('company') || '',
            location: queryParams.get('location') || '',
        });

        setFilterParams({
            jobTypes: queryParams.get('jobTypes') ? queryParams.get('jobTypes').split(',') : [],
            salarySort: queryParams.get('salarySort') || '0',
            roleSort: queryParams.get('roleSort') || '0', // Initialize roleSort parameter
        });
    }, [location.search]);

    const handleChange = (field, value) => {
        setSearchParams((prevSearchParams) => ({
            ...prevSearchParams,
            [field]: value,
        }));
    };

    const handleJobTypeToggle = (jobType) => {
        setFilterParams((prevFilterParams) => {
            const updatedJobTypes = [...prevFilterParams.jobTypes];

            if (updatedJobTypes.includes(jobType)) {
                updatedJobTypes.splice(updatedJobTypes.indexOf(jobType), 1);
            } else {
                updatedJobTypes.push(jobType);
            }

            return {
                ...prevFilterParams,
                jobTypes: updatedJobTypes,
            };
        });
    };

    const backgorundColor = () => isDarkMode ? "bg-[#ffffff62]" : ''

    const handleSubmitSearch = () => {
        const searchQuery = new URLSearchParams({
            ...(searchParams.jobs ? { jobs: searchParams.jobs } : {}),
            ...(searchParams.company ? { company: searchParams.company } : {}),
            ...(searchParams.location ? { location: searchParams.location } : {}),
        }).toString();

        const filterQuery = new URLSearchParams({
            ...(filterParams.jobTypes.join(',') ? { jobTypes: filterParams.jobTypes.join(',') } : {}),
            ...(filterParams.salarySort !== '0' ? { salarySort: filterParams.salarySort } : {}),
        }).toString();

        const queryString = searchQuery + (showFilter ? `&${filterQuery}` : '');

        navigate(`/admin/jobs?${queryString}`);
    };

    return (
        <>
            <div className="w-full grid   p-4 px-2 md:px-10 ">
                <div className={`grid job-card   rounded-lg ${backgorundColor()}`}>
                    <div className='w-full flex flex-col items-center p-2 '>
                        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
                            <InputTextField
                                className='shadows !z-0 !caret-black'
                                label='Role'
                                value={searchParams.jobs}
                                onChange={(e) => handleChange('jobs', e.target.value)}
                            />
                            <InputTextField
                                className='shadows !z-0 !caret-black'
                                label='Company'
                                value={searchParams.company}
                                onChange={(e) => handleChange('company', e.target.value)}
                            />
                            <InputTextField
                                className='shadows !z-0 !caret-black'
                                label='Location'
                                value={searchParams.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                            />
                        </div>
                    </div>
                    {showFilter && <div className='w-full flex flex-col items-start p-3'>
                        <h1 className=' text-xl '>Filter The Jobs</h1>
                        <div className="w-full grid gap-4   sm:grid-cols-2 rounded-lg  lg:grid-cols-3  p-2 ps-5 ">
                            <div className="grid">
                                <FormControl className='shadows '>
                                    <Select
                                        value={filterParams.salarySort}
                                        onChange={(e) => setFilterParams({ ...filterParams, salarySort: e.target.value })}
                                    >
                                        <MenuItem value="0">Sort With Salary package</MenuItem>
                                        <MenuItem value="asc">Salary Low To High</MenuItem>
                                        <MenuItem value="desc"> Salary High To Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                        </div>
                        <h1>Select Job Types  </h1>
                        <div className=" flex flex-wrap ps-5 gap-2 p-2 items-center">
                            {jobTypes?.map((title, index) => (
                                <button className={`p-1 px-2  text-sm border text-[#0e1239] border-[#0e1239] flex items-center  rounded-lg `} key={index} onClick={() => handleJobTypeToggle(title)}>
                                    {filterParams?.jobTypes?.includes(title) ? <RadioButtonChecked className="text-[#265996]" /> : <RadioButtonUnchecked className="text-black" />}
                                    {title}
                                </button>
                            ))}
                        </div>
                    </div>}
                    <div className=" flex gap-4 justify-end items-start
                      p-4 my-2">
                        <MyButton
                            className='shadows !px-5 !z-0 max-sm:!text-[.6rem] '
                            onClick={() => setShowFilter(!showFilter)}

                        >
                            Filter
                        </MyButton>
                        <MyButton
                            className='shadows sm:!px-5 !z-0 max-sm:!text-[.6rem] '
                            onClick={handleSubmitSearch}

                        >
                            {showFilter ? "Search Filtered Data" : "Search"}
                        </MyButton>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSearchJobs;
