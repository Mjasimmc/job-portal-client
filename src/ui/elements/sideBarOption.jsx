// SideBarOption.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBarOption = ({ option, setPageOptions,index ,sideBarOpen }) => {
    const userLogged = useSelector(state => state.user.isLogin);
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const navigate = useNavigate();
    const location = useLocation();
    const shadeBackgroud = ()=> isDarkMode? 'bg-white/25' : 'bg-black/25';
    return (
        <div
            className={`p-1 ps-5 my-2 py-2  rounded-md shadow-md cursor-pointer text-md font-[300] ${location.pathname === option.to ?  shadeBackgroud() : ""} ${!!userLogged || !option.view && " hidden"}`}
            onClick={() => {
                if(setPageOptions){
                    setPageOptions(false);
                }
                navigate(option.to);
            }}
            key={option.keyId}
        >
            {option.title}
        </div>
    );
};

export default SideBarOption;
