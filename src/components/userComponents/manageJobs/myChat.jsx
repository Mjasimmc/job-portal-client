import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

const MyChat = ({ mes, chat, index }) => {
    const { isDarkMode , primaryColor ,secondaryColor } = useSelector((state) => state.theme);
    const [show, setShow] = useState(false);
    const [lineShow, setLineShow] = useState({ number: 1, showShowMore: false });

    const handleShowWithCard = useCallback(() => {
        console.log(index);
        setTimeout(() => {
            setShow(true);
        }, 100 * index);
    }, [index]);

    const getTimeWithAMPM = (date) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(date).toLocaleTimeString(undefined, options);
    };

    const truncateDescription = (description, maxLength) => {
        const maxLengthPlus = maxLength * lineShow.number;
        let value = description
            .substring(0, maxLengthPlus)
            .split('\n')
            .filter((line) => line.trim() !== '')
            .join('\n');
        return value;
    };

    const handleShowMore = () => {
        setLineShow((prev) => {
            return { ...prev, number: prev.number + 1, };
        });
    };

    const scrollToBottom = () => {
        document.body.scrollTop = document.body.scrollHeight;
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
    };

    useEffect(() => {
        handleShowWithCard();
    }, [handleShowWithCard]);

    useEffect(() => {
        if (show) {
            scrollToBottom();
        }
    }, [show]);
    useEffect(() => {
        setLineShow(prev => { return { ...prev, showShowMore: prev.number + 1 < Math.ceil(mes.message.length / 800) } })
    }, [lineShow.number]);

    return (
        <div className={`w-full flex max-w-full  flex-wrap ${chat ? 'justify-end ' : 'justify-start'}`}>
            {show && (
                <div className={` pe-0  animate-cards rounded-md flex ${chat ? ' flex-row-reverse' : ''}`}>
                    <div
                        className={`h-full w-4   ${chat ? 'bg-green-500/50 rounded-br-none' : ' bg-gray-400/50 rounded-bl-none  '}`}
                    >
                        <div
                            className={` h-full w-[1rem]   ${chat ? 'rounded-tl-full' : 'rounded-tr-full'} ${secondaryColor}  `}
                        ></div>
                    </div>
                    <div
                        className={`break-words !max-w-full rounded-lg grid  p-3 gap-2 ${chat ? 'bg-green-500/50  rounded-tr-none' : ' bg-gray-400/50 rounded-tl-none '
                            }`}
                    >
                        <p style={{ whiteSpace: 'pre-line' }} className='max-w-[60vw]'>
                            {' '}
                            {truncateDescription(mes.message, 800)}
                            {lineShow.showShowMore && (
                                <button onClick={handleShowMore} className="text-blue-500 hover:underline">
                                    Show More
                                </button>
                            )}
                        </p>
                        <p className={` flex text-[.7rem] justify-end`}>{getTimeWithAMPM(mes.createdAt)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyChat;
