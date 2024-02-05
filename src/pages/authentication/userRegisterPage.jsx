import React, { useState } from 'react';
import Google from '../../assets/icons/google_logo.png'
import { useNavigate } from 'react-router-dom';
import NoHeaderContentBody from '../../ui/body/no-header-content-body';

import banner_1 from '../../assets/banners/banner-2.svg'
import RegisterUser from '../../components/authComponents/registerUser';
import UserLogged from '../../config/userLogged';




const UserRegisterPage = () => {
    const navigate = useNavigate()
    return (<>
        <NoHeaderContentBody>
            <div className='login-css-container w-full max-w-[24rem] border '>
                <div className="login-css-heading">Sign Up</div>
                <div action="" className="form">
                    <RegisterUser />
                    <span className="agreement" onClick={() => navigate('/auth/login')}>Log in to your account</span>
                </div>
            </div>
        </NoHeaderContentBody >
    </>
    );
}

export default UserRegisterPage;
