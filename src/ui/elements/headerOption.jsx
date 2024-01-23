import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HeaderOption = (props) => {
   
    return (
        <div {...props} className={props.className + ' p-2 text-md font-[350] uppercase duration-200  cursor-pointer'}>
            {props.children}
        </div>
    );
}

export default HeaderOption;
