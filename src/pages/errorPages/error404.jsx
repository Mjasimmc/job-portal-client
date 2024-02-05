import React, { useContext, useEffect } from 'react';

import "./error.css"
import { useNavigate } from 'react-router-dom';
import { UserMainContext } from '../../store/contexts/userContext';
import MyButton from '../../ui/elements/myButton';
const Error404 = () => {
    const navigate = useNavigate()

    const handleGoHomeButton = () => {
        navigate(-1)
    }
 
    return (
        <div className="w-full flex justify-center items-center flex-col  p-10">
            <p className='text-4xl'>404</p>
            <p>Page not found</p>
           <div className="">
           <MyButton onClick={handleGoHomeButton}>Go Back</MyButton>
           </div>
        </div>
    );
}

export default Error404;
