import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { setUserLogin } from '../../store/slices/userSlice'

import { validate } from '../../config/validations';
import { toast } from 'react-toastify';
import { toast_config } from '../../config/constants';
import { createOtpToValidateEmail, userLogin } from '../../service/authServive';
import { useDispatch } from 'react-redux';
import { socket } from '../../socketIo';
import InputTextField from '../../ui/elements/InputTextField';
import MyButton from '../../ui/elements/myButton';

const LoginUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        userId: {
            data: "",
            valid: true
        },
        password: {
            data: "",
            valid: true
        }
    })

    const handleDataInput = (value, type) => {
        let updateData = userData
        if (type === 'userId') {
            updateData = { ...updateData, [type]: { data: value, valid: !!value } }
        } else if (validate(type, value)) {
            updateData = { ...updateData, [type]: { data: value, valid: true } }
        } else {
            updateData = { ...updateData, [type]: { data: value, valid: false } }
        }
        setUserData(updateData)
    }
    const validateAll = () => {
        try {
            let datas = userData
            let validation = true
            if (userData.userId.data.length > 0) {
                datas.userId.valid = true
            } else {
                datas.userId.valid = false
                validation = false
                toast.error("enter valid user_id", toast_config)
            }
            if (!!userData.password.data && validate('password', userData.password.data)) {
                datas.password.valid = true
            } else {
                datas.password.valid = false
                validation = false
                toast.error("enter valid password", toast_config)
            }

            setUserData({ ...datas })
            return validation
        } catch (error) {
        }
    }
    const submitLogin = async () => {
        if (!validateAll()) return false
        try {
            const res = await userLogin(userData)
            if (!res.status) {
                Swal.fire({
                    title: "Email Is not Validated?",
                    text: "Click Continue to Enter Email Adress",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Continue!",
                    cancelButtonText: "cancel!",
                    reverseButtons: true
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const { value: email } = await Swal.fire({
                            title: "Input email address",
                            input: "email",
                            inputLabel: "Your email address",
                            showCancelButton: true,
                            inputPlaceholder: "Enter your email address"
                        });
                        const res = await createOtpToValidateEmail(email)
                        console.log(res)
                        navigate('/auth/otp/' + res.otp_id)
                        if (email) {
                            Swal.fire(`Entered email: ${email}`);
                        }
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        Swal.fire({
                            title: "Cancelled",
                            text: "Your imaginary file is safe :)",
                            icon: "error"
                        });
                    }
                });
            } else {
                dispatch(setUserLogin(res.mes))
                navigate(-1)
                socket.connect()
                socket.emit('createRoom', res.mes._id)
                toast.success("submited", toast_config)
            }
        } catch (error) {
            toast.error(error, toast_config)
        }
    }
    return (
        <>

            <InputTextField
                required=""
                value={userData.userId.data}
                onChange={(e) => handleDataInput(e.target.value, 'userId')} 
                // className="login-css-form-input" 
                type="email" name="email" id="email" label="E-mail" />
            {!userData.userId.valid && <p className='text-xs text-[red]'> username/phone/email required</p>}
            <InputTextField
                required=""
                // className="login-css-form-input"
                type="password"
                name="password"
                id="password"
                label="Password"
                value={userData.password.data}
                onChange={(e) => handleDataInput(e.target.value, 'password')}
            />
            {!userData.password.valid && <p className='text-xs text-[red] px-3'>required A-Z + a-z + 0-9</p>}
            {!userData.password.valid && <p className='text-xs text-[red]'> Minimum 8 charected</p>}
            <span className="login-css-fgtpass"><Link to={'/auth/forgotpassword'} className='login-css-form-input-a'>Forgot Password ?</Link></span>

            <MyButton className="login-css-button border " type="submit" onClick={() => submitLogin()} >
                Sign In
            </MyButton>

        </>
    );
}

export default LoginUser;
