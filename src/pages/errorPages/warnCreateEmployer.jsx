import React from 'react';

const WarnCreateEmployer = ({children}) => {
    return (
        
        <div className='w-full aspect-[3] grid place-content-center'>
            <button className="warning-employer">{children}</button>
        </div>
    );
}

export default WarnCreateEmployer;
