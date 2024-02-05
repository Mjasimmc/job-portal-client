import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const IsAdminLogged = () => {
    const navigate = useNavigate()
    const adminlogged = useSelector(state => state.admin.isLogin)
    useEffect(() => {
        if(!adminlogged){
            navigate('/admin/login')
        }
    }, [adminlogged])
    return (
        <>
            
        </>
    );
}

export default IsAdminLogged;
