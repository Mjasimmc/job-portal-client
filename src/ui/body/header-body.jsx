import React from 'react';
import { useSelector } from 'react-redux';

const HeaderBody = ({ children }) => {
    const theme = useSelector(state => state.theme)
    console.log(theme)
    return (
        <header className={`fixed top-0 w-full  duration-300 min-w-[300px] h-[6.5rem] z-[9]  ${theme.primaryColor}`}>
            {children}
        </header>
    );
}

export default HeaderBody;
