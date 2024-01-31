import React from 'react';
import { useSelector } from 'react-redux';

const NoHeaderContentBody = ({ children }) => {
    const {isDarkMode} = useSelector(state => state.theme)
    return (
        <>
            <section className={` w-full  min-h-screen  justify-center items-center flex ${isDarkMode ?  "bg-[#020408] text-white":"bg-[#EEF7FC]"}`}>
                {children}
            </section>
        </>
    );
}

export default NoHeaderContentBody;
