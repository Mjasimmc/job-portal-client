import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate } from '../../config/validations';
import { toast_config } from '../../config/constants';

import { toast } from 'react-toastify';
import { createNewUserFromAdmin } from '../../service/admin/admin';

const CreateUserPage = () => {
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
            if (value == userData.repassword.data && userData.repassword.valid) {
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
            const res = await createNewUserFromAdmin(userData.name.data, userData.email.data, userData.phone.data, userData.password.data)
            navigate('/admin/users')
            toast.success('created User', toast_config)
        } catch (error) {
            toast.error(error, toast_config)
            
        }
    }
    return (<div className="p-5">
        <div className='max-w-[22rem] grid gap-2'>
            <h1 className='text-3xl font-bold uppercase p-3 text-center'>Create new user </h1>
            <div className="grid">
                <input
                    className={`text-cadet border p-3 px-5 rounded-md outline-none ${!userData.name.valid ? 'text-[red] border-[red]' : ''}`}
                    placeholder="Username"
                    value={userData.name.data}
                    onChange={(e) => handleDataInput(e.target.value, 'name')}
                />
                {!userData.name.valid && <p className='text-xs text-[red]'> Name required</p>}
            </div>

            <div className="grid">
                <input
                    className={`text-cadet border p-3 px-5 rounded-md outline-none ${!userData.email.valid ? 'text-[red] border-[red]' : ''}`}
                    placeholder="Email"
                    type='email'
                    value={userData.email.data}
                    onChange={(e) => handleDataInput(e.target.value, 'email')}
                />
                {!userData.email.valid && <p className='text-xs text-[red]'>Input Valid Email</p>}
            </div>

            <div className="grid">
                <input
                    className={`text-cadet border p-3 px-5 rounded-md outline-none ${!userData.phone.valid ? 'text-[red] border-[red]' : ''}`}
                    placeholder="(+91)-(9876543210)"
                    value={userData.phone.data}
                    onChange={(e) => handleDataInput(e.target.value, 'phone')}
                />

                {!userData.phone.valid && <p className='text-xs text-[red]'> Input Valid Phone Number</p>}
            </div>
            <div className="grid gap-1">

                <input
                    type='password'
                    className={`text-cadet border p-3 px-5 rounded-md outline-none ${!userData.password.valid ? 'text-[red] border-[red]' : ''}`}
                    placeholder="Password"
                    value={userData.password.data}
                    onChange={(e) => handleDataInput(e.target.value, 'password')}
                />
                {!userData.password.valid && <p className='text-xs text-[red]'>required A-Z + a-z + 0-9</p>}
                {!userData.password.valid && <p className='text-xs text-[red]'> Minimum 8 charected</p>}
            </div>

            <div className="grid">
                <input
                    type='password'
                    className={`text-cadet border p-3 px-5 rounded-md outline-none ${!userData.repassword.valid ? 'text-[red] border-[red]' : ''}`}
                    placeholder="Re-Password"

                    value={userData.repassword.data}
                    onChange={(e) => handleDataInput(e.target.value, 'repassword')}
                />
                {!userData.repassword.valid && userData.repassword.data && <p className='text-xs text-[red]'>password not match</p>}
                {userData.repassword.valid && userData.repassword.data && <p className='text-xs text-[green]'>password  matched</p>}
            </div>

            <div className="flex justify-center">
                <Button className='!text-lg !p-2 !bg-[#d1d1d1]' onClick={submitRegister}>
                    Create
                </Button>
            </div>
        </div>
    </div>
    );
}

export default CreateUserPage;
