import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from '@mui/x-date-pickers';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { addEducation } from '../../../service/user';
import { useNavigate } from 'react-router-dom';

const EducationForm = () => {
    const navigate = useNavigate()
    const [educationData, setEducationData] = useState({
        degree: '', // Added degree field
        college: '',
        course: '',
        graduationStartDate: null,
        graduationEndDate: null,
    });

    const [validation, setValidation] = useState({
        degree: true,
        college: true,
        course: true,
        graduationStartDate: true,
        graduationEndDate: true,
    });

    const handleInputData = (key, value) => {
        setEducationData((prevEducationData) => ({ ...prevEducationData, [key]: value }));
        setValidation((prevValidation) => ({ ...prevValidation, [key]: validateField(key, value) }));
    };

    const validateField = (key, value) => {
        switch (key) {
            case 'degree':
                return value.trim() !== '' ? true : 'Degree is required';
            case 'college':
                return value.trim() !== '' ? true : 'College name is required';
            case 'course':
                return value.trim() !== '' ? true : 'Course name is required';
            case 'graduationStartDate':
                return value !== null ? true : 'Graduation start date is required';
            case 'graduationEndDate':
                return value !== null ? true : 'Graduation end date is required';
            default:
                return true;
        }
    };

    const isFormValid = () => {
        return Object.values(validation).every((isValid) => isValid === true);
    };
    const isDataPresent = () => {
        return Object.values(educationData).every((data) => data !== null && data !== '');
    };

    const handleSubmit = async () => {
        try {
            if (isFormValid() && isDataPresent()) {
                const res = await addEducation(educationData);
                navigate('/profile')
            } else {
                toast.error('Form is not valid. Please check the fields.', toast_config);
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div className='w-full p-2 lg:px-10'>
             <div className="flex justify-end w-full">
                <Button className='!text-black !bg-red-50 !m-3' onClick={() => navigate("/profile")}>Back to Profile</Button>
            </div>
            <div className='w-full border shadow'>
                <h1 className='text-center text-2xl font-semibold underline underline-offset-1'>
                    Education Information
                </h1>

                <div className='grid md:grid-cols-2 gap-4 p-2'>
                    <div className='grid'>
                        <TextField
                            className='!caret-black'
                            label='Degree'
                            value={educationData.degree}
                            onChange={(e) => handleInputData('degree', e.target.value)}
                            error={validation.degree !== true}
                            helperText={validation.degree !== true ? validation.degree : ''}
                        />
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4 p-2'>
                    <div className='grid'>
                        <TextField
                            className='!caret-black'
                            label='College'
                            value={educationData.college}
                            onChange={(e) => handleInputData('college', e.target.value)}
                            error={validation.college !== true}
                            helperText={validation.college !== true ? validation.college : ''}
                        />
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4 p-2'>
                    <div className='grid'>
                        <TextField
                            className='!caret-black'
                            label='Course'
                            value={educationData.course}
                            onChange={(e) => handleInputData('course', e.target.value)}
                            error={validation.course !== true}
                            helperText={validation.course !== true ? validation.course : ''}
                        />
                    </div>
                </div>

                <div className='flex flex-wrap items-center gap-4 p-2'>
                    Graduation Start Date
                    <CalendarIcon />
                    <DatePicker
                        className='border rounded-lg caret-black p-3 flex items-center'
                        showIcon
                        selected={educationData.graduationStartDate || new Date()}
                        dateFormat='dd/MM/yyyy'
                        onChange={(date) => handleInputData('graduationStartDate', date)}
                    />
                    {!validation.graduationStartDate && (
                        <p className='text-red-500'>{validation.graduationStartDate}</p>
                    )}
                </div>

                <div className='flex flex-wrap items-center gap-4 p-2'>
                    Graduation End Date
                    <CalendarIcon />
                    <DatePicker
                        className='border rounded-lg caret-black p-3 flex items-center'
                        showIcon
                        selected={educationData.graduationEndDate || new Date()}
                        dateFormat='dd/MM/yyyy'
                        onChange={(date) => handleInputData('graduationEndDate', date)}
                    />
                    {!validation.graduationEndDate && (
                        <p className='text-red-500'>{validation.graduationEndDate}</p>
                    )}
                </div>

                <Button className='!shadow !m-2 !bg-gray-700 !text-white' onClick={handleSubmit}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default EducationForm;
