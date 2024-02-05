import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from '@mui/x-date-pickers';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { useNavigate } from 'react-router-dom';
import { addExperience } from '../../../service/user';
import InputTextField from '../../../ui/elements/InputTextField';
import MyButton from '../../../ui/elements/myButton';

const ExperienceForm = () => {
    const navigate = useNavigate();
    const [experienceData, setExperienceData] = useState({
        position: '',
        company: '',
        employmentStartDate: null,
        employmentEndDate: null,
    });

    const [validation, setValidation] = useState({
        position: true,
        company: true,
        employmentStartDate: true,
        employmentEndDate: true,
    });

    const handleInputData = (key, value) => {
        setExperienceData((prevExperienceData) => ({ ...prevExperienceData, [key]: value }));
        setValidation((prevValidation) => ({ ...prevValidation, [key]: validateField(key, value) }));
    };

    const validateField = (key, value) => {
        switch (key) {
            case 'position':
                return value.trim() !== '' ? true : 'Position is required';
            case 'company':
                return value.trim() !== '' ? true : 'Company name is required';
            case 'employmentStartDate':
                return value !== null ? true : 'Employment start date is required';
            case 'employmentEndDate':
                return value !== null ? true : 'Employment end date is required';
            default:
                return true;
        }
    };

    const isFormValid = () => {
        return Object.values(validation).every((isValid) => isValid === true);
    };
    const isDataPresent = () => {
        return Object.values(experienceData).every((data) => data !== null && data !== '');
    };

    const handleSubmit = async () => {
        try {
            if (isFormValid() && isDataPresent()) {
                const res = await addExperience(experienceData)
                navigate('/profile');
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
                    Experience Information
                </h1>

                <div className='grid md:grid-cols-2 gap-4 p-2'>
                    <div className='grid'>
                        <InputTextField
                            className='!caret-black'
                            label='Position'
                            value={experienceData.position}
                            onChange={(e) => handleInputData('position', e.target.value)}
                            error={validation.position !== true}
                            helperText={validation.position !== true ? validation.position : ''}
                        />
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4 p-2'>
                    <div className='grid'>
                        <InputTextField
                            className='!caret-black'
                            label='Company'
                            value={experienceData.company}
                            onChange={(e) => handleInputData('company', e.target.value)}
                            error={validation.company !== true}
                            helperText={validation.company !== true ? validation.company : ''}
                        />
                    </div>
                </div>

                <div className='flex flex-wrap items-center gap-4 p-2'>
                    Employment Start Date
                    <CalendarIcon />
                    <DatePicker
                        className='border rounded-lg text-black  caret-black p-3 flex items-center'
                        showIcon
                        selected={experienceData.employmentStartDate || new Date()}
                        dateFormat='dd/MM/yyyy'
                        onChange={(date) => handleInputData('employmentStartDate', date)}
                    />
                    {!validation.employmentStartDate && (
                        <p className='text-red-500'>{validation.employmentStartDate}</p>
                    )}
                </div>

                <div className='flex flex-wrap items-center gap-4 p-2'>
                    Employment End Date
                    <CalendarIcon />
                    <DatePicker
                        className='border rounded-lg  text-black caret-black p-3 flex items-center'
                        showIcon
                        selected={experienceData.employmentEndDate || new Date()}
                        dateFormat='dd/MM/yyyy'
                        onChange={(date) => handleInputData('employmentEndDate', date)}
                    />
                    {!validation.employmentEndDate && (
                        <p className='text-red-500'>{validation.employmentEndDate}</p>
                    )}
                </div>

              
                <div className="flex justify-center">
                    <MyButton className='px-4 text-lg m-4' onClick={handleSubmit}>
                        Save
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export default ExperienceForm;
