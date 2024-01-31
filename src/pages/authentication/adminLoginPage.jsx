import React, { useEffect, useState } from 'react';
import Google from '../../assets/icons/google_logo.png'
import { useNavigate } from 'react-router-dom';
import NoHeaderContentBody from '../../ui/body/no-header-content-body';

import banner_1 from '../../assets/banners/banner-2.svg'
import RegisterUser from '../../components/authComponents/registerUser';
import LoginUser from '../../components/authComponents/loginUser';
import UserLogged from '../../config/userLogged';
import LoginAdmin from '../../components/authComponents/loginAdmin';
import { useSelector } from 'react-redux';




const AdminLoginPage = () => {
    const navigate = useNavigate()
    const adminLogged = useSelector(state => state.admin.isLogin)
    useEffect(() => {
        if (adminLogged) {
            navigate("/admin")
        }
    }, [adminLogged])
    return (<>
        <NoHeaderContentBody>
            {/* <UserLogged /> */}
            <div className='login-css-container text-black'>
                <div className="login-css-heading">Sign In</div>
                <div action="" className="form">
                    <LoginAdmin />
                    
                    
                </div>
            </div>

        </NoHeaderContentBody >
    </>
    );
}

export default AdminLoginPage;
