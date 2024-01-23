import { Box, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import profileTemp from '../../assets/images/profileImage-1.png'
import { Close, LoginRounded, Logout, Person, Subscriptions } from '@mui/icons-material';
import { UserMainContext } from '../../store/contexts/userContext';
import { setAdminLogout } from '../../store/slices/adminSlice';
const AdminProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        setPageOptions,
        sideOptions,
        setSideOptions } = useContext(UserMainContext)
    const { isLogin, name, email } = useSelector(state => state.admin)

    const handleUserLogout = () => {
        setSideOptions(false)
        dispatch(setAdminLogout())
    }
    return (
        <>
            {!isLogin && <Button onClick={() => navigate('/auth/login')}>
                <LoginRounded className="!text-3xl aspect-square !text-black" />
            </Button>}
            {isLogin && <>
                <div className="h-12 aspect-square  flex items-center justify-center" onClick={() => {
                    setPageOptions(false)
                    setSideOptions(!sideOptions)
                }}>
                    <img src={profileTemp} className='h-full aspect-auto rounded-full' alt="" />
                </div>

                {sideOptions && <div className="fixed right-4 rounded-lg gap-1 top-[5.5rem] grid  bg-white max-w-[9rem] w-full " onMouseLeave={() => setSideOptions(false)}>
                    <Box sx={{ zIndex: 9999, display: 'grid', gap: '5px', backgroundColor: 'white', paddingY: '.5rem', paddingX: '.2rem' }} className='shadows' >
                        <div className="w-full">
                            <div className=" flex justify-end">
                            </div>
                            <div className="p-2 text-xs">
                                <p className='text-end' onClick={() => setSideOptions(false)}> <Close className='!text-xs' /></p>
                               
                            </div>
                        </div>
                       
                       
                        <Button className="shadow !flex !justify-start  !bg-white !p-1 !px-3 " sx={{ zIndex: 9999 }}>
                            <p className="!text-xs flex items-center gap-1" onClick={handleUserLogout}>
                                <Logout className="!text-md aspect-square !text-black" /> Logout
                            </p>
                        </Button>

                    </Box>
                </div>}
            </>}

        </>)
}

export default AdminProfile;
