import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import EmployerProfile from './EmployerProfile';
import { UserMainContext } from '../../../store/contexts/userContext';
import EmployeeProfile from './EmployeeProfile';
import { useSelector } from 'react-redux';

const UserProfilePortfolio = () => {
    const { isDarkMode } = useSelector(state => state.theme)
    const { employeeProfile, setEmployeeProfile } = useContext(UserMainContext)

    const backgrouColor = () => {
        return !isDarkMode ? 'bg-black/25' : 'bg-white/25'
    }
    return (<>
        <div className="max-md:w-full md:w-8/12 shadows flex gap-2 flex-wrap justify-center p-2">
            <Button className='!bg-[#aaa9a9] !text-black'>Applied Jobs</Button>
            <Button className='!bg-[#aaa9a9] !text-black'>Create Job</Button>
            <Button className='!bg-[#aaa9a9] !text-black'>Subscription</Button>
        </div>
        <div className="max-md:w-full md:w-8/12 shadows grid grid-cols-2 ">
            <button
                 className={`p-2 rounded-lg duration-500 ${employeeProfile ? backgrouColor() :''}`}
                onClick={() => {
                    localStorage.setItem("employeeProfile", true)
                    setEmployeeProfile(true)
                }}>Employee Profile</button>
            <button
                className={`p-2 rounded-lg duration-500 ${!employeeProfile ? backgrouColor() :''}`}
                onClick={() => {
                    localStorage.setItem("employeeProfile", false)
                    setEmployeeProfile(false)
                }}>Employer Profile</button>
        </div>
        <div className="max-md:w-full md:w-8/12 shadows ">
            {!employeeProfile && <h1 className='p-2'>Employer Profile </h1>}
            {!employeeProfile && <EmployerProfile />}
            {employeeProfile && <h1 className='p-2'>Employee Profile </h1>}
            {employeeProfile && <EmployeeProfile />}
        </div>
    </>
    );
}

export default UserProfilePortfolio;
