import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserLogged = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.isLogin)
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[user])
    return (
        <>
            
        </>
    );
}

export default UserLogged;
