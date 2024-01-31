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
            <div className='login-css-container text-black'>
                <div className="login-css-heading">OTP</div>
                <div action="" className="form">
                    <OtpUser />
                </div>

            </div>
        </NoHeaderContentBody >
    </>
    );
}
export default OtpPage;
