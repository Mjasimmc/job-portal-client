import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { AdminContext } from '../../store/contexts/adminContext';
import Logo from './logo';
import { Close, DarkMode, LightModeOutlined, Menu, Person } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminLogout } from '../../store/slices/adminSlice';
import HeaderBody from '../body/header-body';
import { useNavigate } from 'react-router-dom';
import AdminProfile from './adminProfile';
import { setDardMode } from '../../store/slices/themeSlice';

const HeaderAdmin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isDarkMode } = useSelector(state => state.theme)
    const {
        sideBarOpen,
        setSideBarOpen
    } = useContext(AdminContext)

    const handleLogout = () => {
        dispatch(setAdminLogout())
    }
    const handleThemeChange = () => {
        dispatch(setDardMode())
    }
    return (
        <HeaderBody>
            <div className={`w-full h-full flex-1 flex items-center justify-between p-4  xl:px-16  shadows`}>
                <div className="flex items-center h-full justify-normal gap-2">

                    <button onClick={() => setSideBarOpen(!sideBarOpen)} className=" active:scale-110 p-1 flex items-center aspect-square lg:hidden !text-black">
                        {sideBarOpen ? <Close className="" /> : <Menu />}
                    </button>
                    <Logo />
                    {/* <img src={logo1} className="w-10 aspect-square shadows cursor-pointer" onClick={() => navigate('/')} alt="" /> */}
                    <p className="max-[500px]:hidden font-[400] text-2xl cursor-pointer " onClick={() => navigate('/')}>CareerHarbor</p>
                </div>


                <div className="flex gap-2 items-center">
                    <div className="">
                        <button onClick={handleThemeChange}>
                            {isDarkMode && <DarkMode className="!text-3xl aspect-square !text-[#ffffff]" />}
                            {!isDarkMode && <LightModeOutlined className="!text-3xl aspect-square !text-black" />}
                        </button>
                    </div>
                    <AdminProfile />
                </div>
            </div>
        </HeaderBody>
    );
}

export default HeaderAdmin;
