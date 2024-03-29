import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { getEmployeeData, updateEmployeeProfile } from '../../../service/user';
import { useNavigate } from 'react-router-dom';
import InputTextField from '../../../ui/elements/InputTextField';
import MyButton from '../../../ui/elements/myButton';
import { useSelector } from 'react-redux';

const EditEmployeeProfile = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user)
    const [employeeData, setEmployeeData] = useState({
        full_name: "",
        email: "",
        phone: "",
        linkedIn: "",
        gitHub: "",
    });
    const [changes, setChanges] = useState(null);

    const handleInput = (key, value) => {
        setEmployeeData({ ...employeeData, [key]: value });
    };

    const saveEmployeeProfile = async () => {
        // Validation for full name
        if (employeeData.full_name.trim() === "") {
            toast.error("Please provide a full name", toast_config);
            return;
        }

        // Validation for email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(employeeData.email)) {
            toast.error("Please provide a valid email address", toast_config);
            return;
        }

        // Validation for phone number
        const phonePattern = /^\d{10}$/; // Assuming a simple 10-digit number for this example
        if (!phonePattern.test(employeeData.phone)) {
            toast.error("Please provide a valid phone number", toast_config);
            return;
        }

        // Validation for GitHub and LinkedIn links (if provided)
        const urlPattern = /^(https?:\/\/)?(www\.)?(linkedin\.com\/\w+|github\.com\/\w+)/i;

        // Validation for GitHub link
        if (employeeData.gitHub && !urlPattern.test(employeeData.gitHub)) {
            toast.error("Please provide a valid GitHub link", toast_config);
            return;
        }
        
        // Validation for LinkedIn link
        if (employeeData.linkedIn && !urlPattern.test(employeeData.linkedIn)) {
            toast.error("Please provide a valid LinkedIn link", toast_config);
            return;
        }

        // All validations passed, proceed to save the profile
        try {
            await updateEmployeeProfile(employeeData);
            navigate(-1)
            toast.success("Updated employee profile", toast_config);
        } catch (error) {
            console.error(error);
            toast.error("Server error", toast_config);
        }
    };

    const getEmployeesData = async () => {
        try {
            const res = await getEmployeeData();

            if (!res.employee) {
                setChanges(null)
            } else {
                setChanges(res?.employee || employeeData);
            }
            setEmployeeData(res.employee || {
                ...employeeData,
                email: user.email.mail_id,
                full_name: user.name,
                phone: user.phone.number
            });
        } catch (error) {
            toast.error("Server error", toast_config);
        }
    };

    useEffect(() => {
        getEmployeesData();
    }, []);

    return (
        <>
            <div className="flex justify-end w-full">
                <MyButton className=' !m-3' onClick={() => navigate("/profile")}>Back to Profile</MyButton>
            </div>
            <div className="max-md:p-4 md:p-[3rem] !pt-0 w-full  border rounded-lg ">
                <p className='text-center text-xl font-bold m-4'>Update Portfolio </p>
                <div className="w-full grid m-3 md:grid-cols-2 lg:grid-cols-3 items-center  gap-4">
                    <InputTextField
                        className='!caret-black'
                        label="Full Name" value={employeeData.full_name}
                        onChange={({ target: { value } }) => handleInput('full_name', value)}
                    />
                    <InputTextField
                        className='!caret-black'
                        label="Email" value={employeeData.email}
                        onChange={({ target: { value } }) => handleInput('email', value)}
                    />
                    <InputTextField
                        className='!caret-black'
                        label="Phone" value={employeeData.phone}
                        onChange={({ target: { value } }) => handleInput('phone', value)}
                    />
                </div>
                <div className="w-full grid gap-2 m-2  max-w-4xl">
                    <InputTextField
                        className='!caret-black'
                        label="GitHub Link" value={employeeData.gitHub}
                        onChange={({ target: { value } }) => handleInput('gitHub', value)}
                    />
                    <InputTextField
                        className='!caret-black'
                        label="LinkedIn Link" value={employeeData.linkedIn}
                        onChange={({ target: { value } }) => handleInput('linkedIn', value)}
                    />
                </div>
                {changes !== employeeData && <div className="w-full flex justify-center m-5">
                    <div className="">
                        <MyButton className='!p-4' onClick={saveEmployeeProfile}>Update Employee Profile</MyButton>
                    </div>
                </div>}
            </div>
        </>
    );
};

export default EditEmployeeProfile;
