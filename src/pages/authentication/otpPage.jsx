import React, { useState } from 'react';
import Google from '../../assets/icons/google_logo.png'
import { useNavigate } from 'react-router-dom';
import NoHeaderContentBody from '../../ui/body/no-header-content-body';

import banner_1 from '../../assets/banners/banner-2.svg'
import LoginUser from '../../components/authComponents/loginUser';
import OtpUser from '../../components/authComponents/otpUser';
import UserLogged from '../../config/userLogged';

const OtpPage = () => {
    const navigate = useNavigate()
    return (<>
        <UserLogged />
        <NoHeaderContentBody>
            <div className="flex gap-4 items-center">
                
            <div className=" w-full max-w-[20rem]  gap-3  grid p-2 bg-gray-300/50 rounded-md">
                <OtpUser />
            </div>
            <div className=" w-full flex flex-col items-center gap-5 justify-center max-w-[20rem] max-lg:hidden ">
                <h1 className='text-3xl'>Enter Otp</h1>
                <img src={banner_1} className='w-full aspect-square shadows  ' alt="" />
            </div>
            </div>
        </NoHeaderContentBody >
    </>
    );
}
export default OtpPage;
