import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const UserNotLogged = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector(state => state.user.isLogin)
    useEffect(()=>{
        if(!user && location.pathname !== '/'){
            navigate('/auth/login')
        }
    },[user])   
    return (
        <>
            
        </>
    );
}

export default UserNotLogged;
