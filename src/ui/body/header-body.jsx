import React from 'react';
import { useSelector } from 'react-redux';

const HeaderBody = ({children}) => {
    const {isDarkMode} = useSelector(state => state.theme)
    return (
        <header className={`fixed top-0 w-full  duration-1000 min-w-[300px] h-[6.5rem] z-[9]  ${isDarkMode ? "bg-[#2d2d2d] ":"bg-white"}`}>
            {children}
        </header>
    );
}

export default HeaderBody;
