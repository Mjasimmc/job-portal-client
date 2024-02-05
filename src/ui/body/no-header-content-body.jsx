import React from 'react';
import { useSelector } from 'react-redux';

const NoHeaderContentBody = ({ children }) => {
    const {primaryColor} = useSelector(state => state.theme)
    return (
        <>
            <section className={` w-full p-1 min-h-screen  justify-center items-center flex flex-col ${primaryColor}`}>
                {children}
            </section>
        </>
    );
}

export default NoHeaderContentBody;
