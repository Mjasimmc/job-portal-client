import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { getEmployeeData, updateEmployeeProfile } from '../../../service/user';
import { useNavigate } from 'react-router-dom';

const EditEmployeeProfile = () => {
    const navigate = useNavigate();
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
        try {
            const res = await updateEmployeeProfile(employeeData);
            // setEmployeeData(res);
            // setChanges(res);
            navigate('/profile')
            toast.success("Updated employee profile", toast_config);
        } catch (error) {
            console.error(error);
            toast.error("Server error", toast_config);
        }
    };

    const getEmployeesData = async () => {
        try {
            const res = await getEmployeeData();
            setEmployeeData(res.employee || employeeData);
            setChanges(res.employee || employeeData);
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
                <Button className='!text-black !bg-red-50 !m-3' onClick={() => navigate("/profile")}>Back to Profile</Button>
            </div>
            <div className="max-md:p-4 md:p-[3rem] !pt-0 w-full">
                <p className='text-center text-xl font-bold m-4'>Update Portfolio </p>
                <div className="w-full grid m-3 md:grid-cols-2 lg:grid-cols-3 items-center  gap-4">
                    <TextField
                        className='!caret-black'
                        label="Full Name" value={employeeData.full_name}
                        onChange={({ target: { value } }) => handleInput('full_name', value)}
                    />
                    <TextField
                        className='!caret-black'
                        label="Email" value={employeeData.email}
                        onChange={({ target: { value } }) => handleInput('email', value)}
                    />
                    <TextField
                        className='!caret-black'
                        label="Phone" value={employeeData.phone}
                        onChange={({ target: { value } }) => handleInput('phone', value)}
                    />
                </div>
                <div className="w-full grid gap-2 m-2  max-w-4xl">
                    <TextField
                        className='!caret-black'
                        label="GitHub Link" value={employeeData.linkedIn}
                        onChange={({ target: { value } }) => handleInput('linkedIn', value)}
                    />
                    <TextField
                        className='!caret-black'
                        label="LinkedIn Link" value={employeeData.gitHub}
                        onChange={({ target: { value } }) => handleInput('gitHub', value)}
                    />
                </div>
                {changes !== employeeData && <div className="w-full flex justify-center m-5">
                    <div className="border rounded">
                        <Button className='!px-4 !text-black !bg-[#0000005f]' onClick={saveEmployeeProfile}>Update Employee Profile</Button>
                    </div>
                </div>}
            </div>
        </>
    );
};

export default EditEmployeeProfile;
