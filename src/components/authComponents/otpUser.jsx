import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateOtp } from '../../service/authServive';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../store/slices/userSlice';
import { socket } from '../../socketIo';

const OtpUser = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('')
    const submitotp = async ()=>{
        try {
            const res = await validateOtp(otp,params.otpId)
            dispatch(setUserLogin(res))
            socket.connect()
            socket.emit('createRoom', res._id)
        } catch (error) {
            
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center  gap-3">
                <h1 className='text-3xl'>Enter Otp</h1>
                <TextField
                    className='text-cadet !text-center'
                    label="Enter otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <Button className='!text-lg !p-2 !bg-[#d1d1d1]' onClick={submitotp} >Submit</Button>
            </div>
        </>
    );
}

export default OtpUser;
