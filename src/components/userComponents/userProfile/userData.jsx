import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import profileImage from '../../../assets/images/profileImage-1.png'
import { DoNotDisturb, Done, DoneOutline, Edit } from '@mui/icons-material';
const UserData = () => {
    const user = useSelector(state => state.user)
    return (
        <>
            <div className="max-md:w-full md:w-8/12 shadows">
                <div className="flex max-md:flex-col-reverse justify-evenly gap-8 items-center p-3  ">
                    <div className=" p-1 flex-1  flex items-start justify-between">
                        <div className="flex flex-col justify-end gap-2 md:min-h-[6rem] md:px-6 max-md:text-center">
                            <p>{user.name} </p> 
                            <p> {user.email.mail_id} {user.email.validated? <Done className='!text-[green]' />: <DoNotDisturb  className='!text-[red]' /> }</p>
                            <p>+91-{user.phone.number} {user.phone.validated? <Done className='!text-[green]' />: <DoNotDisturb  className='!text-[red]' /> }</p>
                            <p>profession mention</p>
                        </div>
                        {/* <div className="h-full md:min-h-[6rem]">
                            <Button>
                                <Edit />
                            </Button>
                        </div> */}
                    </div>
                    <img src={profileImage} className='w-[8rem] aspect-square rounded-full' alt="" />
                </div>
            </div>
        </>
    );
}

export default UserData;
