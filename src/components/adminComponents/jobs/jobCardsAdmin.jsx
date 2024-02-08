import { Block, Close, Edit, KeyboardOptionKey, Link, MoreVert, Report, TurnedIn, WarningOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const JobCardsAdmin = ({ job }) => {
    const { isDarkMode , secondaryColor }= useSelector(state => state.theme)

    const optionMange = useMemo(() => [
        {
            title: 'Block',
            Icon: Block
        }, {
            title: 'Warn',
            Icon: WarningOutlined
        },
    ], [])
    const navigate = useNavigate();
    const [optionDrop, setOptionDrop] = useState(false)
    const truncateDescription = (description, maxLength) => {
        const truncatedText = description.substring(0, maxLength);
        const nonEmptyLines = truncatedText.split('\n').filter(line => line.trim() !== '');
        return nonEmptyLines.join('\n');
    };
    return (
        <div className={`flex flex-col justify-between  job-card bg-white/5 rounded-lg p-2 px-4  ${secondaryColor}`}>
            <div className="flex justify-between items-center">
                <div className="flex-1"><h1 className='text-lg uppercase p-1 cursor-pointer ' onClick={() => navigate('/admin/jobs/view/' + job._id)}><strong>{job.role}  </strong> </h1></div>
                <div className="relative ">
                    <div className="" onClick={() => setOptionDrop(!optionDrop)}>
                        {!optionDrop && <MoreVert className='' />}
                        {optionDrop && <Close className='' />}
                    </div>
                    {optionDrop && <div className={`absolute  job-card  rounded-lg right-0 w-[7rem] flex flex-col gap-1 p-1  top-[2rem] ${isDarkMode ? 'bg-black' : 'bg-white'}`} onMouseLeave={() => setOptionDrop(false)}>
                        {optionMange.map(({ title, Icon }) => (
                            <button key={title} className={`text-xs flex p-1 items-center  rounded-md max:hidden gap-1 ${isDarkMode ? 'bg-[#2f2f2f]' : ''}`} >
                                <Icon /> {title}
                            </button>
                        ))}

                    </div>}
                </div>
            </div>
            <div className=' flex flex-wrap   gap-0 !text-md '>
                <div className="flex flex-col justify-evenly flex-[.6] max-w-full">
                    <div className="w-full flex  flex-wrap gap-2">
                        {job.jobType.map((title, index) => (
                            <p key={index} className={`border  text-xs px-1 rounded-md bg-green-500 text-[#49739a]`}>{title}</p>
                        ))}
                    </div>
                    <div className='text-sm p-1 '>
                        <p className='text-lg'>{job.companyName} </p>
                        <p>{job.location}</p>
                    </div>
                    <div className='text-sm p-1  py-2'>Vacancy  : {job.vacancy > 10 ? '10+' : job.vacancy} </div>
                    <div className='text-sm p-1  py-2'>Salary : {job.salary} </div>
                </div>
                <div className="flex-[.4]  sm:pt-8">
                    <p className='text-md'><strong>Requirements</strong></p>
                    <div className="text-[.7rem] ps-4 max-w-full">
                        {job.requirements.map((requirement, i) => (
                            <Fragment key={i}>
                                <p className='flex'>{i < 3 && truncateDescription(requirement, 55)} </p>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <div className="px-1 my-1">
                <p className="text-xs" style={{ whiteSpace: 'pre-line' }}>{truncateDescription(job.description, 35)}</p>
            </div>

        </div>
    );
}

export default JobCardsAdmin;
