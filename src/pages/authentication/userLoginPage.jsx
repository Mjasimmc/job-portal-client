import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoHeaderContentBody from '../../ui/body/no-header-content-body';

import LoginUser from '../../components/authComponents/loginUser';
import UserLogged from '../../config/userLogged';
import { googleAuth } from '../../firebase/firebaseConfig';
import { userLoginGoogleAuthFirebase } from '../../service/authServive';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';
import { toast_config } from '../../config/constants';




const UserLoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleAuth = async () => {
        try {
            
            const res = await googleAuth()
            const logRes = await userLoginGoogleAuthFirebase(res.user.email)
            dispatch(setUserLogin(logRes))
        } catch (error) {
            toast.error('google authentication failed' , toast_config)
        }
    }
    return (<>
        <NoHeaderContentBody>
            <UserLogged />
            <div className='login-css-container w-full max-w-[23rem] border '>
                <div className="login-css-heading">Sign In</div>
                <div action="" className="form">
                    <LoginUser />
                    <div className="social-account-container">
                        <span className="title">Or Sign in with</span>
                        <div className="social-accounts">
                            <button className="social-button google" onClick={handleGoogleAuth}>
                                <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <span className="agreement" onClick={() => navigate('/auth/sign-up')}>Create new account</span>
                </div>
            </div>
            {/* <div className=" w-full max-w-[20rem] gap-3  grid p-2">
                <div className='flex justify-center items-center'>Continue with   <img src={Google} className='w-[5rem]' />
                </div>
                <p className='text-center'>or</p>
                

                <div className="flex items-center flex-col p-2">
                    <p>or</p>
                    <p className='cursor-pointer' >Create New Account</p>
                </div>
            </div>
            <div className=" w-full flex flex-col items-center gap-5 justify-center max-w-[20rem] max-lg:hidden ">
                <h1 className='text-3xl'>Sign In Your Account</h1>
                <img src={banner_1} className='w-full aspect-square shadows  ' alt="" />
            </div> */}
        </NoHeaderContentBody >

    </>
    );
}

export default UserLoginPage;
