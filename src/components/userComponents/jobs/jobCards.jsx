import { Close, KeyboardOptionKey, Link, MoreVert, Report, TurnedIn, TurnedInNot } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../ui/elements/myButton';
import { validateJobApplied } from '../../../service/userApplyJob';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { removeFromSavedList, saveToSavedList } from '../../../service/user/job';


const JobCards = ({ job, index }) => {
    const user = useSelector(state => state.user);

    const { isDarkMode } = useSelector(state => state.theme)
    const navigate = useNavigate();
    const [optionDrop, setOptionDrop] = useState(false)
    const [jobApplied, setJobApplied] = useState(false)
    const [postSaved, setPostSaved] = useState(false)
    const [show, setShow] = useState(false)

    const handleShowCard = () => {
        setTimeout(() => setShow(true), index * 150)
    }
    const postSavedCheck = () => {
        if (job.saved) {
            job.saved.map((id) => {
                if (id == user.id) {
                    setPostSaved(true)
                }
            })
        }
    }

    const truncateDescription = (description, maxLength) => description.substring(0, maxLength).split('\n').filter(line => line.trim() !== '').join('\n');

    const appliedJobValidate = async () => {

      try {
        handleShowCard()
        if (!user.isLogin) return null
        postSavedCheck()
        const jobApplication = await validateJobApplied(job._id);
        setJobApplied(!!jobApplication)
       
      } catch (error) {
        
      } 
    }

    const handleApplyJob = () => {
        if (!user.isLogin) {
            return navigate('/auth/login')
        }
        navigate("/job/apply/" + job._id)
    }
    const handleManageJobs = () => {
        if (!user.isLogin) {
            return navigate('/auth/login')
        }
        navigate("/job/manage/" + job._id)
    }
    const handleSaveJobList = async () => {
        try {
            const res = await saveToSavedList(job._id)
            // console.log(res)
            setPostSaved(true)
            toast.success("sucessfully saved job", toast_config)
        } catch (error) {
            toast.error("error occured on saving post", toast_config)
        }
    }
    const handleRemoveSaveJobList = async () => {
        try {
            const res = await removeFromSavedList(job._id)
            // console.log(res)
            setPostSaved(false)
            toast.success("sucessfully removed from saved job", toast_config)
        } catch (error) {
            toast.error("error occured on saving post", toast_config)
        }
    }
    const ViewDate = (date) => {
        const dateConvert = new Date(date);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return dateConvert.toLocaleDateString() +" " + dateConvert.toLocaleTimeString(undefined, options);
    };

    useEffect(() => {
        appliedJobValidate()
    }, [])

    return (<>
        {show && <div className={`flex flex-col justify-between duration-300 job-card hover:scale-[1.005] bg-white/5   active:scale-[.9999] bg-gradient-to-br from-[#00000000] rounded-lg p-2 px-4 hover:to-gray-500/10  animate-cards ${isDarkMode ? 'border border-[#ff35ab]' : ''}`}>
            <div className="flex justify-between items-center">
                <div className="flex-1"><h1 className={`text-lg uppercase p-1 cursor-pointer ${isDarkMode ? 'text-[#3cff52]' : ''}`} onClick={() => navigate('/job/view/' + job._id)}><strong>{job.role}  </strong> </h1></div>
                <div className="relative ">
                    <div className="" onClick={() => setOptionDrop(!optionDrop)}>
                        {!optionDrop && <MoreVert className='' />}
                        {optionDrop && <Close className='' />}
                    </div>
                    {optionDrop && <div className={`absolute  shadow px-1 rounded-lg right-0 w-[7rem] grid  top-[2rem] ${isDarkMode ? 'bg-black' : 'bg-white'}`} onMouseLeave={() => setOptionDrop(false)}>
                        <button className="text-xs flex p-1 items-center  max:hidden gap-1" >
                            <Link /> Copy Link
                        </button>
                        <button className="text-xs flex p-1 items-center  max:hidden gap-1" >
                            <Report /> Report
                        </button>


                    </div>}
                </div>
            </div>
            <div className=' flex flex-wrap   gap-0 !text-md ' >
                <div className="flex flex-col justify-evenly flex-[.6] max-w-full">
                    <div className="w-full flex  flex-wrap gap-2">
                        {job.jobType.map((title, index) => (
                            <p key={index} className={`border  text-[.7rem] px-1 rounded-md ${isDarkMode ? 'bg-[#172f5b]' : 'bg-[#0a245631]'}`}>{title}</p>
                        ))}
                    </div>
                    <div className='text-sm p-1 '>
                        <p className='text-lg'>{job.companyName} </p>
                        <p>{job.location}</p>
                    </div>
                    <div className='text-sm p-1  py-2'>Vacancy  : {job.vacancy > 10 ? '10+' : job.vacancy} </div>
                    <div className='text-sm p-1  py-2'>Salary : {job.salary} </div>
                </div>
                {!!job.requirements.length && <div className="flex-[.4]  sm:pt-8">
                    <p className='text-md'><strong>Requirements</strong></p>
                    <div className="text-[.7rem] ps-4 max-w-full">
                        {job.requirements.map((requirement, i) => (
                            <Fragment key={i}>
                                <p className='flex'>{i < 3 && truncateDescription(requirement, 55)} </p>
                            </Fragment>
                        ))}
                    </div>
                </div>}
            </div>
            <div className="px-1 my-1">
                <p className="text-xs" style={{ whiteSpace: 'pre-line' }}>{truncateDescription(job.description, 35)}</p>
            </div>
            <div className="flex justify-between items-center gap-4 max-h-[2rem] my-3 ">
                {!jobApplied && job.employer.user !== user.id && <MyButton className="min-w-[8rem]" onClick={handleApplyJob}>Apply</MyButton>}
                {jobApplied && job.employer.user !== user.id && <MyButton className="min-w-[8rem]"  >Applied</MyButton>}
                {job.employer.user === user.id && <MyButton onClick={handleManageJobs} className="min-w-[8rem]">Manage</MyButton>}
                {postSaved && <div className="rounded-md " onClick={handleRemoveSaveJobList}>
                    <TurnedIn />
                </div>}
                {!postSaved && <div className="rounded-md " onClick={handleSaveJobList}>
                    <TurnedInNot />
                </div>}
            </div>
            <p className='text-[.6rem] text-end'>posted on {ViewDate(job.createdAt)}</p>
        </div>}
    </>
    );
};

export default JobCards;
