import React, { useEffect, useState } from 'react';
import { socket } from '../../../socketIo';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { NotificationsNoneTwoTone } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const navigate = useNavigate()
    const [notificationCount, setNotificationCount] = useState(0);
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const handleShowNotification = (mess) => {
        toast(mess.title, toast_config);
        setNotificationCount((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        socket.on('notification', handleShowNotification);
        return () => {
            socket.off('notification', handleShowNotification);
        };
    }, []);

    const handleNotificationButtonClick = () => {
        setNotificationCount(0)
        navigate('/notification')
    };

    return (
        <>
            <div

                className="w-[2rem] h-[2rem]  relative flex flex-col  items-center justify-center "
                onClick={handleNotificationButtonClick}
            >
                {notificationCount > 0 && (<div className="absolute w-full h-full text-end flex items-start justify-end">

                    <span className={`  border  px-1 rounded-full text-[.8rem]   -mb-[10%] ${isDarkMode ? 'text-black bg-white' : ' text-white bg-black'}`}>{notificationCount}</span>
                </div>
                )}
                <NotificationsNoneTwoTone className="!text-3xl aspect-square" />
            </div>
        </>
    );
};

export default Notification;
