import React from 'react';
import { useSelector } from 'react-redux';

const HeaderBody = ({ children }) => {
    const theme = useSelector(state => state.theme)
    return (
        <header className={`fixed top-0 w-full   xl:px-[4rem]  duration-300 shadow min-w-[300px] grid p-1 h-[6.5rem] z-[9]  ${theme.primaryColor}`}>
            {children}
        </header>
    );
}

export default HeaderBody;
