import React, { useEffect } from 'react';

const ViewApplicantProfile = ({user}) => {
    useEffect(()=>{
        console.log(user)
    },[])
    return (
        <div className="w-full grid p-2 gap-2">
           <div className="grid grid-cols-3 max-w-[50%] w-full min-w-[20rem]">
                <p>Full Name</p> <p>:</p> <p>{user.name}</p>
                <p>Email</p> <p>:</p> <p>{user.email.mail_id}</p>
                <p>Phone</p> <p>:</p> <p>{user.phone.number}</p>
            </div>
        </div>
    );
}

export default ViewApplicantProfile;
