import { Box, Button } from '@mui/material';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import profileTemp from '../../assets/images/profileImage-1.png';
import { Close, LoginRounded, Logout, Person, Subscriptions } from '@mui/icons-material';
import { setUserLogout } from '../../store/slices/userSlice';
import { UserMainContext } from '../../store/contexts/userContext';
import { socket } from '../../socketIo';

const UserProfileImage = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const {
        setPageOptions,
        sideOptions,
        setSideOptions,
    } = useContext(UserMainContext);
    const { isLogin, name, email } = useSelector((state) => state.user);

    const handleUserLogout = () => {
        socket.disconnect()
        setSideOptions(false);
        // navigate('/auth/login')
        dispatch(setUserLogout());
    };

    return (
        <>
            {!isLogin && (
                <button className='p-4' onClick={() => navigate('/auth/login')}>
                    <LoginRounded className="!text-3xl aspect-square" />
                </button>
            )}
            {isLogin && (
                <>
                    <div
                        className="h-12 aspect-square  flex items-center justify-center"
                        onClick={() => {
                            setPageOptions(false);
                            setSideOptions(!sideOptions);
                        }}
                    >
                        <img
                            src={profileTemp}
                            className="h-full aspect-auto rounded-full"
                            alt=""
                        />
                    </div>

                    {sideOptions && (
                        <div
                            className={`fixed right-4 rounded-lg gap-1 top-[5.5rem] grid max-w-[9rem] w-full  ${
                                isDarkMode ? 'bg-black' : 'bg-white'
                            }`}
                            onMouseLeave={() => setSideOptions(false)}
                        >
                            <Box
                                sx={{
                                    zIndex: 9999,
                                    display: 'grid',
                                    gap: '5px',
                                    paddingY: '.5rem',
                                    paddingX: '.2rem',
                                }}
                                className="shadows"
                            >
                                <div className="w-full">
                                    <div className=" flex justify-end"></div>
                                    <div
                                        className={`p-2 text-xs ${
                                            isDarkMode ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        <p
                                            className="text-end"
                                            onClick={() => setSideOptions(false)}
                                        >
                                            {' '}
                                            <Close className='!text-xs' />
                                        </p>
                                        <p> {name}</p>
                                        <p> {email.mail_id}</p>
                                    </div>
                                </div>
                                <Button
                                    className="shadow !flex !justify-start !p-1 !px-3 "
                                    onClick={() => {
                                        setSideOptions(false);
                                        navigate('/profile');
                                    }}
                                >
                                    <p  className={`!text-xs flex items-center gap-1 ${ isDarkMode ? 'text-white' : 'text-black'}`}>
                                        <Person className="!text-md aspect-square  " /> Profile
                                    </p>
                                </Button>
                                <Button
                                    className="shadow !flex !justify-start !p-1 !px-3 "
                                    onClick={() => {
                                        setSideOptions(false);
                                        navigate('/subscribtion');
                                    }}
                                >
                                    <p  className={`!text-xs flex items-center gap-1 ${ isDarkMode ? 'text-white' : 'text-black'}`}>
                                        <Subscriptions className="!text-md aspect-square " />{' '}
                                        Subscription
                                    </p>
                                </Button>
                                <Button
                                    className="shadow !flex !justify-start !p-1 !px-3 "
                                    sx={{ zIndex: 9999 }}
                                >
                                    <p
                                        className={`!text-xs flex items-center gap-1 ${ isDarkMode ? 'text-white' : 'text-black'}`}
                                        onClick={handleUserLogout}
                                    >
                                        <Logout className={`!text-md aspect-square `} /> Logout
                                    </p>
                                </Button>
                            </Box>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UserProfileImage;
