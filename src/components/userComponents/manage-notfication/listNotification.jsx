import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllNotifications } from '../../../service/user/notfication';
import { useNavigate } from 'react-router-dom';

const ListNotification = () => {
    const navigate = useNavigate()
    const [notfications, setNotifications] = useState([])
    useEffect(() => {
        const getAllNotificationDatas = async () => {
            const list = await getAllNotifications()
            console.log(list)
            setNotifications(list.reverse())
        }
        getAllNotificationDatas()

    }, []);

    const getTimeStampDDMMYYTT_TT_TT= (date)=>{
        const dateString  = new Date(date).toLocaleDateString()
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const timeString  = new Date(date).toLocaleTimeString(undefined, options);
        return `${dateString} ${timeString}`
    }
    return (
        <div className='w-full flex flex-col items-center p-8'>
            <div className="w-full md:max-w-[45rem] flex-1 p-2  grid gap-4 ">
                <h1 className='text-2xl underline underline-offset-2'>Notifications</h1>
                {notfications.map((nft) => (<Fragment key={nft._id}>
                    <div className="w-full flex border justify-between flex-wrap rounded-md" onClick={()=>{
                        navigate(nft.url)
                    }}>
                        <p className=' p-3  '>{nft.description}</p>
                        <p className=' p-3  '>{getTimeStampDDMMYYTT_TT_TT(nft.createdAt)}</p>
                    </div>
                </Fragment>))}
            </div>
        </div>
    );
}

export default ListNotification;
