import React from 'react';

import imageLogo from '../../assets/logo.png';
const Logo = () => {
    return (
        <div className='w-[3.5rem] aspect-square p-2'>
            <img src={imageLogo} className='w-full rounded-full aspect-auto' alt="" />
        </div>
    );
}

export default Logo;
