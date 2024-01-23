import { Send } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';
import MyButton from '../../../ui/elements/myButton';
import { useSelector } from 'react-redux';
import { socket } from '../../../socketIo';
import { useParams } from 'react-router-dom';
import { getAllMessage, sendMessageToApplicationId } from '../../../service/jobLiveInteraction';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import MyChat from './myChat';

const ChatApplicant = ({ userId, job }) => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const { applicantId } = useParams();
    const user = useSelector(state => state.user);
    const [sendMessageData, setSendMessageData] = useState('');
    const [applicantMessages, setApplicantMessages] = useState([]);

    const getDateCurrentDate = (date) => {
        const currDate = new Date(date).toLocaleDateString();
        if (currDate === new Date().toLocaleDateString()) {
            return 'today';
        }
        return currDate;
    };

    let lastDisplayedDate = null;

    useEffect(() => {
        const getMessages = async () => {
            try {
                const messages = await getAllMessage(applicantId);
                const sortedMessages = messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setApplicantMessages(sortedMessages);
            } catch (error) {
                console.error(error);
            }
        };

        const handleMessageReceiver = (data) => {
            setApplicantMessages((prev) => [...prev, data]);
        };

        socket.on('messageReciever', handleMessageReceiver);
        getMessages();

        return () => {
            socket.off('messageReciever', handleMessageReceiver);
        };
    }, [applicantId]);

    const scrollToBottom = () => {
        document.body.scrollTop = document.body.scrollHeight;
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
    };

    const sendMessage = async () => {
        try {
            if (!sendMessageData.trim()) {
                return toast.error('No message found to send', toast_config);
            }
            const messageStored = await sendMessageToApplicationId(sendMessageData, applicantId, 'text');
            setSendMessageData('');
            setApplicantMessages((prev) => [...prev, messageStored]);
            socket.emit('sendMessage', {
                ...messageStored,
                senderId: userId,
                applicant: false,
                description: 'unread message on ' + job.role + ' application'
            });
        } catch (error) {
            toast.error(error, toast_config);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [applicantMessages]);

    useEffect(() => {
        console.log(applicantMessages);
    }, [applicantMessages]);

    return (
        <>
            <div className="w-full flex-1 p-4 flex flex-col">
                <div className="border p-4 rounded-lg duration-1000 text-md font-[350] max-w-full box-shadow flex-1 flex flex-col gap-3">
                    {applicantMessages.map((mes, index) => {
                        const currentDate = getDateCurrentDate(mes.createdAt);
                        if (currentDate !== lastDisplayedDate) {
                            lastDisplayedDate = currentDate;
                            return (
                                <Fragment key={`date-${currentDate}`}>
                                    <p className="text-center mb-2 text-gray-500">{currentDate}</p>
                                    <MyChat mes={mes} chat={user.id === mes.sender} />
                                </Fragment>
                            );
                        }
                        return <MyChat key={mes._id} mes={mes} chat={user.id === mes.sender} />;
                    })}
                </div>
            </div>
            <div className={`w-full fixed bottom-2 left-0 min-w-[300px]`}>
                <div className="w-full  p-2 px-6 xl:px-[5.5rem]">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                        className={`flex items-end box-shadow rounded-lg border gap-4 px-3 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-white'
                            }`}
                    >
                        <textarea
                            type="text"
                            rows={1}
                            className={`!flex-1 !min-h-[3.5rem] p-4 !min-w-[10rem] bg-transparent max-h-[80vh] outline-none ${isDarkMode ? 'caret-white' : 'caret-black'
                                }`}
                            onChange={(e) => setSendMessageData(e.target.value)}
                            value={sendMessageData}
                            placeholder="Type here ..."
                        />
                        <MyButton type="submit">
                            <Send />
                        </MyButton>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatApplicant;
