import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateOtp } from '../../service/authServive';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../store/slices/userSlice';
import { socket } from '../../socketIo';
import MyButton from '../../ui/elements/myButton';
import { toast } from 'react-toastify';
import { toast_config } from '../../config/constants';
import InputTextField from '../../ui/elements/InputTextField';

const OtpUser = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('')
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
    return (
        <>
            <div className="flex flex-col justify-center items-center  gap-3">

                <InputTextField
                    label="Enter otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

            </div>
            <div className="w-full flex justify-between py-4">
                <MyButton className='!text-lg !p-2 !bg-[#d1d1d1]' onClick={submitotp} >Submit</MyButton>
                <MyButton className='!text-lg !p-2 !bg-[#d1d1d1]' onClick={submitotp} >Re-send</MyButton>
            </div>
        </>
    );
}

export default OtpUser;
