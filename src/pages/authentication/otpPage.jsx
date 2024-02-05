import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoHeaderContentBody from '../../ui/body/no-header-content-body';
import OtpUser from '../../components/authComponents/otpUser';
import UserLogged from '../../config/userLogged';
import { validateOtpPage } from '../../service/authServive';
import Loading from '../../ui/LoadingPages/Loading';
import Error404 from '../errorPages/error404';

const OtpPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [load, setLoad] = useState(false);
    const [otpPageNotFound, setOtpPageNotFound] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(0);

    const handleTimeChange = (seconds) => {
        if (seconds >= 0) {
            setSecondsLeft(seconds);
        }
    };

    const validateOtpId = async () => {
        try {
            setLoad(true);
            const res = await validateOtpPage(params.otpId);

            if (res.valid) {
                handleTimeChange(30);
            } else {
                setOtpPageNotFound(true);
            }
        } catch (error) {
            setOtpPageNotFound(true);
            console.error(error);
        } finally {
            setLoad(false);
        }
    };

    useEffect(() => {
        const timerInterval = setInterval(() => {
            handleTimeChange(secondsLeft - 1);
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [secondsLeft]);

    useEffect(() => {
        validateOtpId();
    }, []);

    return (
        <>
            <UserLogged />
            <NoHeaderContentBody>
                {otpPageNotFound && <Error404 />}
                {load && <Loading />}
                {!load && !otpPageNotFound && (
                    <div className='login-css-container w-full max-w-[23rem] border '>
                        <div className="login-css-heading">OTP</div>
                        <div action="" className="form">
                            <OtpUser secondsLeft={secondsLeft} timer={handleTimeChange} />
                        </div>
                    </div>
                )}
            </NoHeaderContentBody>
        </>
    );
};

export default OtpPage;
