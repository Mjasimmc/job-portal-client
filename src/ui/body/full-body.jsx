import React from 'react';
import { useSelector } from 'react-redux';

const FullBody = ({ children }) => {
    const { isDarkMode, primaryColor } = useSelector(state => state.theme)
    return (
        <div className={`w-full  top-0  p-1 pt-[6.7rem] min-h-[100vh] flex flex-col items-center duration-300 ${primaryColor}`}>
              {children}
            
        </div>
    );
}

export default FullBody;
