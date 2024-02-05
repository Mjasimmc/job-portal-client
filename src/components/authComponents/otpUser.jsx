import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { resendOtp, validateOtp, validateOtpPage } from '../../service/authServive';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../store/slices/userSlice';
import { socket } from '../../socketIo';
import MyButton from '../../ui/elements/myButton';
import { toast } from 'react-toastify';
import { toast_config } from '../../config/constants';
import InputTextField from '../../ui/elements/InputTextField';
import Loading from '../../ui/LoadingPages/Loading';
import Error404 from '../../pages/errorPages/error404';

const OtpUser = ({ secondsLeft, timer }) => {
    const params = useParams()
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('')
    const [load, setLoad] = useState(false)
    const [resendDisabled, setResendDisabled] = useState(false);

    const submitotp = async () => {
        try {
            if (!otp) throw 'otp not found'
            const res = await validateOtp(otp, params.otpId)
            dispatch(setUserLogin(res))
            socket.connect()
            socket.emit('createRoom', res._id)
        } catch (error) {
            toast.error('otp not validated', toast_config)
        }
    }

    const hanldeResendOtp = async () => {
        try {
            if (load || secondsLeft > 0 || resendDisabled) return;
            setLoad(true);
            setResendDisabled(true);
            const res = await resendOtp(params.otpId);
            console.log(res);
            timer(30);
        } catch (error) {
            toast.error(error, toast_config);
        } finally {
            setLoad(false);
            setResendDisabled(false);
        }
    }

    return (
        <>
            <InputTextField
                label="Enter otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />

            <div className="w-full flex justify-between py-4">
                <MyButton className='!text-lg !p-2 !bg-[#d1d1d1]' onClick={submitotp} >Submit</MyButton>
                <MyButton className={`!text-lg !p-2 !bg-[#d1d1d1] ${resendDisabled && 'cursor-not-allowed'}`} onClick={hanldeResendOtp} >
                    {load ? "Resending..." : `Re-send ${secondsLeft > 0 ? `(${secondsLeft})` : ''}`}
                </MyButton>
            </div>
        </>
    );
}

export default OtpUser;
