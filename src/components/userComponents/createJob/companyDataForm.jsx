import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import DatePicker from "react-datepicker";
import { CalendarIcon } from '@mui/x-date-pickers';
import "react-datepicker/dist/react-datepicker.css";
import { JobCreateContext } from './createJobPostForm';
import { getEmployerDatab } from '../../../service/user';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { useSelector } from 'react-redux';
import MyButton from '../../../ui/elements/myButton';
import InputTextField from '../../../ui/elements/InputTextField';
import Loading from '../../../ui/LoadingPages/Loading';
import LocationInputField from '../../../config/googleLocation';

const CompanyDataForm = ({ setFormNumber }) => {
    const { isDarkMode } = useSelector(state => state.theme)
    const [load, setLoad] = useState(false)
    const { jobForm, handleSetJobForm } = useContext(JobCreateContext);
    const getEmployerInputs = async () => {
        try {
            setLoad(true)
            const employer = await getEmployerDatab()
            setCompanyData({
                companyName: jobForm.companyName || employer.company_name || '',
                salary: jobForm.salary || '',
                location: jobForm.location || employer.company_location || '',
                deadline: jobForm.deadline || '',
                contactEmail: jobForm.contactEmail || employer.company_email || '',
            });
            setLoad(false)
        } catch (error) {
            toast.error("error occured", toast_config)
            setLoad(false)
        }
    }

    const [companyData, setCompanyData] = useState({
        companyName: '',
        salary: '',
        location: '',
        deadline: '',
        contactEmail: '',
    });

    const [validation, setValidation] = useState({
        companyName: true,
        salary: true,
        location: true,
        deadline: true,
        contactEmail: true,
    });

    useEffect(() => {
        getEmployerInputs()
    }, [jobForm]);

    const handleInputData = (key, value) => {
        setCompanyData((prevCompanyData) => ({ ...prevCompanyData, [key]: value }));
        setValidation((prevValidation) => ({ ...prevValidation, [key]: validateField(key, value) }));
    };

    const validateField = (key, value) => {
        switch (key) {
            case 'companyName':
                return value.trim() !== '' ? true : 'Company name is required';
            case 'salary':
                return value.trim() !== '' ? true : 'Salary is required';
            case 'location':
                return value.trim() !== '' ? true : 'Location is required';
            case 'deadline':
                return value !== '' ? true : 'Deadline is required';
            case 'contactEmail':
                return /\S+@\S+\.\S+/.test(value) ? true : 'Valid email is required';
            default:
                return true;
        }
    };

    const isFormValid = () => Object.values(validation).every((isValid) => isValid === true);

    const handleSubmit = () => {
        if (isFormValid()) {
            handleSetJobForm({ ...jobForm, ...companyData });
            setFormNumber(2); // Proceed to the next form
        } else {
            console.error('Invalid form data. Please check the fields.');
        }
    };

    return (<>
        {load && <Loading />}
        {!load && <div className={`flex flex-col gap-4 border rounded-lg  `}>
            <h1 className='text-center text-2xl font-semibold underline underline-offset-1'>Company Information</h1>

            <div className=" grid md:grid-cols-2 gap-4 p-2">
                <div className="grid">
                    <InputTextField
                        className='!caret-black'
                        label="Company Name"
                        value={companyData.companyName}
                        onChange={(e) => handleInputData('companyName', e.target.value)}
                        error={validation.companyName !== true}
                        // helperText={validation.companyName !== true ? validation.companyName : ''}
                    />
                </div>
            </div>
            <div className=" grid md:grid-cols-2 gap-4 p-2">
                <div className="grid">
                    <InputTextField
                        className='!caret-black'
                        label="Salary"
                        value={companyData.salary}
                        onChange={(e) => handleInputData('salary', e.target.value)}
                        error={validation.salary !== true}
                        // helperText={validation.salary !== true ? validation.salary : ''}
                    />
                </div>
            </div>

            <div className=" grid md:grid-cols-2 gap-4 p-2">
                <div className="grid">
                    {/* <InputTextField
                        className='!caret-black'
                        label="Location"
                        value={companyData.location}
                        onChange={(e) => handleInputData('location', e.target.value)}
                        error={validation.location !== true}
                        helperText={validation.location !== true ? validation.location : ''}
                    /> */}
                    <LocationInputField setValue={(value)=> handleInputData('location',value)}  value={companyData.location}/>
                </div>
            </div>

            <div className=" flex flex-wrap items-center gap-4 p-2 ">
                Dead Line
                <CalendarIcon />
                <DatePicker
                    selected={companyData.deadline ? new Date(companyData.deadline) : new Date()}
                    dateFormat="dd/MM/yyyy"
                    className='p-3 rounded-lg bg-transparent'
                    minDate={new Date()}
                    onChange={(date) => handleInputData('deadline', new Date(date))}
                />
                {!validation.deadline && <p className="text-red-500">{validation.deadline}</p>}
            </div>

            <div className=" grid md:grid-cols-2 gap-4 p-2">
                <div className="grid">
                    <InputTextField
                        className='!caret-black'
                        label="Contact Email"
                        type="email"
                        value={companyData.contactEmail}
                        onChange={(e) => handleInputData('contactEmail', e.target.value)}
                        error={validation.contactEmail !== true}
                        // helperText={validation.contactEmail !== true ? validation.contactEmail : ''}
                    />
                </div>
            </div>
            <div className="p-8 flex justify-end">
                <MyButton className='!p-3 !px-5 !text-xl' onClick={() => setFormNumber(0)}>Prev</MyButton>
                <MyButton className='!p-3 !px-5 !text-xl' onClick={handleSubmit}>Next</MyButton>
            </div>
        </div>}

    </>);
}

export default CompanyDataForm;
