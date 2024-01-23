import React from 'react';
import { useSelector } from 'react-redux';

const MyChat = ({ mes, chat }) => {
    const { isDarkMode } = useSelector(state => state.theme)

    const getTimeWithAMPM = (date) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(date).toLocaleTimeString(undefined, options);
    };
    return (
        <div className={`w-full flex  flex-wrap ${chat ? 'justify-end ' : 'justify-start'}`}>
            <div className={` pe-0 rounded-md flex ${chat ? ' flex-row-reverse' : ''}`}>
                <div className={`h-full w-4  ${chat ? 'bg-green-500/50 rounded-br-none' : ' bg-gray-400/50 rounded-bl-none  '}`}>
                    <div className={` h-full w-[1rem]  duration-500 ${chat ? 'rounded-tl-full' : 'rounded-tr-full'} ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'}  `}></div>
                </div>
                <div className={`break-words px-2 max-w-full rounded-lg grid  gap-2 ${chat ? 'bg-green-500/50  rounded-tr-none' : ' bg-gray-400/50 rounded-tl-none '}`}>
                    <p style={{ whiteSpace: 'pre-line' }}> {mes.message}</p>
                    <p className={` flex text-[.7rem] justify-end`}>{getTimeWithAMPM(mes.createdAt)}</p>
                </div>
            </div>
        </div>
    );
}

export default MyChat;
