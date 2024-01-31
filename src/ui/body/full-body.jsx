import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const FullBody = ({ children }) => {
    const { isDarkMode, primaryColor } = useSelector(state => state.theme);
    const location = useLocation();

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    useEffect(() => {
        scrollTop();
    }, [location]);

    return (
        <div className={`w-full top-0 p-1 pt-[6.7rem] min-h-[100vh] flex flex-col items-center duration-300 ${primaryColor}`}>
            {children}
        </div>
    );
};

export default FullBody;
