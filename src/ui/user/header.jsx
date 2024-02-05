import React, { useContext, useEffect, useRef, useState } from "react";
import logo1 from "../../assets/logo.png";
import { Close, Create, DarkMode, Home, LightModeOutlined, LoginRounded, Menu, Notifications, Store } from '@mui/icons-material'
import HeaderBody from "../body/header-body";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import UserProfileImage from "./userProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { UserMainContext } from "../../store/contexts/userContext";
import HeaderOption from "../elements/headerOption";
import SideBar from "./sideBar";
import MyButton from "../elements/myButton";
import { setDardMode } from "../../store/slices/themeSlice";
import Notification from "../../components/userComponents/manage-notfication/notification";




export const headerOption = [
    {
        keyId: '1',
        title: 'Jobs',
        to: '/',
        view: true
    }, {
        keyId: '2',
        title: 'Job-Status',
        to: '/job-status/applied',
        view: false
    }, {
        keyId: '3',
        title: 'Post-Job',
        to: '/job/create',
        view: true
    }, {
        keyId: '4',
        title: 'Manage-Jobs',
        to: '/job/control',
        view: false
    },
    {
        keyId: '5',
        title: 'About',
        to: '/about',
        view: true
    },
]
const UserHeader = () => {

    const dispatch = useDispatch()
    // const {isDarkMode} = useSelector(state => state.theme)
    const theme = useSelector(state => state.theme)
    const userLogged = useSelector(state => state.user.isLogin);
    const {
        pageOptions,
        setPageOptions,
        setSideOptions
    } = useContext(UserMainContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    
    const handleOpenAndCloseSideBar = () => {
        setSideOptions(false)
        setPageOptions(prevPageOptions => !prevPageOptions);
    }
    const handleThemeChange = ()=>{
        dispatch(setDardMode())
    }
    return (
        <>
        <SideBar {...{
            pageOptions,
            setSideOptions,
            setPageOptions
        }} />
            <HeaderBody>
                <div className={`w-full h-full flex-1 flex items-center justify-between p-4   `}>
                    <div className="flex items-center h-full justify-normal gap-2">

                            <button onClick={handleOpenAndCloseSideBar} className=" active:scale-50 duration-100  p-1 flex items-center aspect-square lg:hidden ">
                                {pageOptions ? <Close className=" !text-3xl"/> : <Menu className=" !text-3xl" />}
                            </button>
                      
                        <img src={logo1} className="w-10 aspect-square shadows cursor-pointer" onClick={() => navigate('/')} alt="" />
                        <p className="max-[500px]:hidden font-[350] text-2xl cursor-pointer " onClick={() => navigate('/')}>CareerHarbor</p>
                    </div>

                    <div className="max-lg:hidden flex items-center duration-1000 justify-evenly gap-2">
                        {headerOption.map((option) => (
                            <HeaderOption
                                onClick={() => navigate(option.to)}
                                key={option.title}
                                className={`  text-md duration-100 font-[400]  ${location.pathname === option.to ? "  text-[#7c61d4] !font-[600]" : ""} ${!!userLogged || !option.view && " hidden"}`}
                            >
                                {option.title}
                            </HeaderOption>
                        ))}
                    </div>
                    <div className="flex gap-2 items-center">
                        <Notification />

                       
                        <div>
                            <button onClick={handleThemeChange}>
                                {theme.isDarkMode &&  <DarkMode className="!text-3xl aspect-square !text-[#ffffff]" />}
                                {!theme.isDarkMode &&  <LightModeOutlined className="!text-3xl aspect-square !text-black" />}
                            </button>
                        </div>
                        <UserProfileImage />
                    </div>
                </div>
            </HeaderBody>
        </>
    );
};

export default UserHeader;