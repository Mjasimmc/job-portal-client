import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { validate } from '../../config/validations';
import { adminLoginService } from '../../service/authServive';
import { setAdminLogin } from '../../store/slices/adminSlice';
import { toast } from 'react-toastify';
import { toast_config } from '../../config/constants';
import MyButton from '../../ui/elements/myButton';

import InputTextField from '../../ui/elements/InputTextField';

const LoginAdmin = () => {
    const dispatch = useDispatch()
    const [adminData, setAdminData] = useState({
        email: { text: '', valid: true },
        password: { text: '', valid: true }
    })

    const handleDataInput = (value, type) => {
        setAdminData({ ...adminData, [type]: { text: value, valid: validate(type, value) } })

    }
    const handleValidateAll = () => {
        if (!adminData.email.text || !adminData.password.text) {
            return false
        }
        return true
    }
    const submitAdminLogin = async () => {
        try {
            if (!handleValidateAll()) throw "Enter valid data"
            const email = adminData.email.text
            const password = adminData.password.text
            const res = await adminLoginService(email, password)
            dispatch(setAdminLogin(res))
        } catch (error) {
            toast.error(error,toast_config)
            // console.log(error)
        }
    }
    return (
        <>
            <div className="grid">
                <InputTextField
                    required=""
                    // className="login-css-form-input"
                    type="email" name="email" id="email"
                     label="E-mail"
                    value={adminData.email.text}
                    onChange={(e) => handleDataInput(e.target.value, 'email')}
                />
                {!adminData.email.valid && <p className='text-xs px-5 text-[red]'>valid email required</p>}
            </div>
            <div className="grid gap-1">
                <InputTextField
                    required=""
                    // className="login-css-form-input"
                    type="password"
                    name="password"
                    id="password"
                    label="Password"
                    value={adminData.password.text}
                    onChange={(e) => handleDataInput(e.target.value, 'password')}
                />
                {!adminData.password.valid && <p className='text-xs text-[red]'>required A-Z + a-z + 0-9</p>}
                {!adminData.password.valid && <p className='text-xs text-[red]'> Minimum 8 charected</p>}
            </div>
            <div className="flex justify-center">
                <MyButton className='!text-lg !p-2 ' onClick={submitAdminLogin}>
                    Submit
                </MyButton>
            </div>

        </>
    );
}

export default LoginAdmin;
