import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { validate } from '../../config/validations';
import { toast } from 'react-toastify';
import { toast_config } from '../../config/constants';
import { userRegister } from '../../service/authServive';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: {
            data: "",
            valid: true
        },
        email: {
            data: "",
            valid: true
        },
        phone: {
            data: "",
            valid: true
        },
        password: {
            data: "",
            valid: true
        },
        repassword: {
            data: "",
            valid: true
        }
    })
    const handleDataInput = (value, type) => {
        let updateData = userData
        if (type == 'password' && type !== 'repassword') {
            if (value == userData.repassword.data) {
                updateData = { ...updateData, ['repassword']: { data: userData.repassword.data, valid: true } }
            } else {
                updateData = { ...updateData, ['repassword']: { data: userData.repassword.data, valid: false } }
            }
        }
        if (type === 'repassword' && value === userData.password.data) {
            updateData = { ...updateData, [type]: { data: value, valid: true } }
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
            if (!!userData.name.data && validate('name', userData.name.data)) {
                datas.name.valid = true
            } else {
                datas.name.valid = false
                validation = false
                toast.error("enter valid name", toast_config)
            }
            if (!!userData.email.data && validate('email', userData.email.data)) {
                datas.phone.valid = true
            } else {
                datas.email.valid = false
                validation = false
                toast.error("enter valid email", toast_config)
            }
            if (!!userData.phone.data && validate('phone', userData.phone.data)) {
                datas.phone.valid = true
            } else {
                datas.phone.valid = false
                validation = false
                toast.error("enter valid phone", toast_config)
            }
            if (!!userData.password.data && validate('password', userData.password.data)) {
                datas.password.valid = true
            } else {
                datas.password.valid = false
                validation = false
                toast.error("enter valid password", toast_config)
            }
            if (!!datas.repassword.data && datas.password.data && datas.password.data === datas.repassword.data) {
                datas.repassword.valid = true
            } else {
                datas.repassword.valid = false
                validation = false
                toast.error("password not match", toast_config)
            }
            setUserData({ ...datas })
            return validation
        } catch (error) {
            
        }
    }
    const submitRegister = async () => {
        try {

            if (!validateAll()) return false
            const res = await userRegister(userData)
            
            toast.success("submited", toast_config)
            navigate('/auth/otp/' + res.data)
        } catch (error) {
            toast.error(error, toast_config)
            
        }
    }
    return (
        <>
          

            <input required="" className="login-css-form-input " type="text"
                value={userData.name.data}
                onChange={(e) => handleDataInput(e.target.value, 'name')}
                placeholder="User-name" m-2 />
            <div className="">
                {!userData.name.valid && <p className='text-xs text-[red]'> Name required</p>}
            </div>
            <input required="" className="login-css-form-input" type="email"
                value={userData.email.data}
                onChange={(e) => handleDataInput(e.target.value, 'email')}
                placeholder="Email" m-2 />
            <div className="">
                {!userData.email.valid && <p className='text-xs text-[red]'>Input Valid Email</p>}
            </div>
            <input required="" className="login-css-form-input" type="tel"
                value={userData.phone.data}
                onChange={(e) => handleDataInput(e.target.value, 'phone')}
                placeholder="Phone" m-2 />
            <div className="">
                {!userData.phone.valid && <p className='text-xs text-[red]'> Input Valid Phone Number</p>}
            </div>
            <input required="" className="login-css-form-input" type="password"
                value={userData.password.data}
                onChange={(e) => handleDataInput(e.target.value, 'password')}
                placeholder="password" />
            <div className="m-2">
                {!userData.password.valid && <p className='text-xs text-[red]'>required A-Z + a-z + 0-9</p>}
                {!userData.password.valid && <p className='text-xs text-[red]'> Minimum 8 charected</p>}
            </div>
            <input required="" className="login-css-form-input" type="password"
                value={userData.repassword.data}
                onChange={(e) => handleDataInput(e.target.value, 'repassword')}
                placeholder="Re-password" />
            <div className="m-2">
                {!userData.repassword.valid && userData.repassword.data && <p className='text-xs text-[red]'>password not match</p>}
                {userData.repassword.valid && userData.repassword.data && <p className='text-xs text-[green]'>password  matched</p>}
            </div>
            <span className="login-css-fgtpass"><a href="#" className='login-css-form-input-a'>Forgot Password ?</a></span>

            <button className="login-css-button" type="submit" onClick={() => submitRegister()} >
                Register
            </button>
        </>
    );
}

export default RegisterUser;
