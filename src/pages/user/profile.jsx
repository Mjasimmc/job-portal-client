import React from 'react';

import UserData from '../../components/userComponents/userProfile/userData';
import UserProfilePortfolio from '../../components/userComponents/userProfile/portfolio';

const ProfilePage = () => {
    
    return (
        <div className=' w-full'>
            <h1 className='pl-[15%] font-bold text-lg'>PROFILE</h1>
            <div className="w-full  flex flex-col justify-center items-center gap-5 py-4  ">
                <UserData />
                <UserProfilePortfolio />
            </div>
        </div>
    );
}

export default ProfilePage;
