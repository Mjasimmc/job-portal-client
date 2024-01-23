import React from 'react';
import { useSelector } from 'react-redux';

const FullBody = ({children}) => {
    const {isDarkMode} = useSelector(state => state.theme)
    return (
        <div className={`w-full pt-[6.7rem] min-h-screen flex flex-col items-center duration-500 gap-1 ${isDarkMode ? "bg-[#2d2d2d] text-white":"bg-white"}`}>
            {children}
        </div>
    );
}

export default FullBody;
