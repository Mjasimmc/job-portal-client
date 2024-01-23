import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { validate } from '../../config/validations';
import { toast } from 'react-toastify'
import { toast_config } from '../../config/constants';
import { createOtpToValidateEmail, userChangePassword, validateOtp } from '../../service/authServive';
import MyButton from '../../ui/elements/myButton';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const FgtEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState({ valid: true, text: '' });
    const [emailValidated, setEmailValidated] = useState(false);
    const [otpdata, setOtpdata] = useState({
        _id: false, number: '', email: ''
    });
    const [pas, setPas] = useState({
        password: { text: '', valid: true },
        repassword: { text: '', valid: true },
    });
    const [timer, setTimer] = useState(30);

    const startTimer = () => {
        if (timer > 0) {
            setTimer((prevTimer) => prevTimer - 1);
        }
    };

    useEffect(() => {
        let timeoutId;

        if (timer > 0) {
            timeoutId = setTimeout(() => {
                startTimer();
            }, 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [timer]);

    const submitEmail = async () => {
        if (email.text === "" || !email.valid) return toast.error("Enter Valid Email", toast_config);

        try {
            const res = await createOtpToValidateEmail(email.text);
            setOtpdata({ ...otpdata, _id: res.otp_id, email: email.text });
            setTimer(30);

            toast.success("OTP generated", toast_config);
        } catch (error) {
            console.log(error);
            toast.error('Error occurred on passing email');
        }
    };
    const submitOtp = async () => {
        try {
            const res = await validateOtp(otpdata.number, otpdata._id)
            setEmailValidated(true)
            toast.success("otp validated", toast_config)
        } catch (error) {
            toast.error(error, toast_config)
        }
    }
    const handleResendOtp = async ()=>{
        if(timer){
            return null
        }
        submitEmail()
    }

    const handleSubmitPasswordChange = async () => {
        try {
            if (!otpdata.email || !pas.password.text) return toast.error("data not found", toast_config)
            const res = await userChangePassword(otpdata.email, pas.password.text)
            console.log(res)
            toast.success("password updated", toast_config)
            dispatch(setUserLogin(res))
            navigate('/')
        } catch (error) {
            toast.error(error, toast_config)
        }
    }
    return (
        <div className='login-css-container'>
            <div action="" className="form">
                {!emailValidated && <div className="flex flex-col justify-center items-center   gap-3">
                    <h1 className='md:text-lg'>Enter Your Email to change password</h1>
                    <input required="" value={email.text}
                        onChange={(e) => setEmail({ text: e.target.value, valid: validate('email', e.target.value) })} className="login-css-form-input border" type="email" name="email" id="email" placeholder="E-mail" />
                    {!email.valid && <p className='text-xs text-[red]'> Enter valid Email</p>}
                    {otpdata.email !== email.text && <MyButton className="login-css-button" onClick={submitEmail} >Send-Otp</MyButton>}
                    {otpdata.email && <div className="w-full flex flex-col items-center gap-4">
                        <input required="" value={otpdata.number}
                            onChange={(e) => setOtpdata({ ...otpdata, number: e.target.value })} className="login-css-form-input border" type="email" name="email" id="email" placeholder="Otp" />
                        <div className="w-full grid grid-cols-2 gap-5">
                            <MyButton className="login-css-button" onClick={submitOtp} >Submit Otp</MyButton>
                            <MyButton className="login-css-button" onClick={handleResendOtp} >Resend Otp {!!timer && timer} </MyButton>
                        </div>
                    </div>}
                </div>}

                {emailValidated && <div className="flex flex-col items-center gap-2">
                    {!pas.password.valid && <p className='text-[red]'>Enter valid password</p>}
                    {!pas.repassword.valid && <p className='text-[red]'>password not match</p>}
                    Enter password
                    <input required="" value={pas.password.text}
                        onChange={(e) => setPas({ ...pas, password: { text: e.target.value, valid: validate('password', e.target.value) } })} className="login-css-form-input border" type="password" placeholder="Password" />
                    Re Enter password
                    <input required="" value={pas.repassword.text}
                        onChange={(e) => {
                            setPas({ ...pas, repassword: { text: e.target.value, valid: validate('password', e.target.value) && pas.password.text == e.target.value } })
                        }} className="login-css-form-input border" type="password" placeholder="RePassword" />
                    {<MyButton className="login-css-button"  onClick={handleSubmitPasswordChange} >Save And Login</MyButton>}
                </div>}
            </div>
        </div>
    );
}

export default FgtEmail;
