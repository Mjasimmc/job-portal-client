import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MyButton from '../ui/elements/myButton';
import { Login } from '@mui/icons-material';

const UserNotLogged = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector(state => state.user.isLogin)
    const hanldeNavigateLogin = ()=>{
        navigate('/auth/login')
    }
    
    return (
        <>
            {user && children}
            {!user  && <div className='text-center flex justify-center items-center flex-col pt-[5rem]'>
                 <p>Login To Continue</p>
                 <MyButton onClick={hanldeNavigateLogin} className="px-4"><Login/> Login</MyButton>
            </div>}
        </>
    );
}

export default UserNotLogged;
