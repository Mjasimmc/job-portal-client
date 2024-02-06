import React, { useContext, useEffect, useMemo, useState } from 'react';
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { JobCreateContext } from './createJobPostForm';
import { useSelector } from 'react-redux';
import MyButton from '../../../ui/elements/myButton';
import InputTextField from '../../../ui/elements/InputTextField';

const JobInformation = ({ setFormNumber }) => {
    const { isDarkMode } = useSelector(state => state.theme)
    const { handleSetJobForm, jobForm } = useContext(JobCreateContext);

    const [jobData, setJobData] = useState({
        role: '',
        jobType: [],
        qualification: '',
        experience: '',
        description: '',
        vacancy: '',
    });

    const [validation, setValidation] = useState({
        role: true,
        qualification: true,
        experience: true,
        description: true,
        vacancy: true,
        jobType: true,
    });

    const [typedQualification, setTypedQualification] = useState('');

    const qualificationOptions = useMemo(
        () => [
            "Bachelor's Degree",
            "Master's Degree",
            'Diploma',
            'Certification',
            'Associate Degree',
        ],
        []
    );

    const jobTypes = useMemo(
        () => ['Part-Time', 'Full-Time', 'Freelance', 'Internship', 'Remote'],
        []
    );

    const handleJobTypeToggle = (jobType) => {
        const updatedJobTypes = [...jobData.jobType];

        if (updatedJobTypes.includes(jobType)) {
            const index = updatedJobTypes.indexOf(jobType);
            updatedJobTypes.splice(index, 1);
        } else {
            updatedJobTypes.push(jobType);
        }

        handleInputData('jobType', updatedJobTypes);
    };

    useEffect(() => {
        setJobData(
            jobForm || {
                role: '',
                jobType: [],
                qualification: '',
                experience: '',
                description: '',
                vacancy: '',
            }
        );
    }, [jobForm]);

    const isStringValid = (value) => {
        return typeof value === 'string' && value.trim() !== '';
    };

    const handleInputData = (key, value) => {
        setJobData((prevJobData) => ({ ...prevJobData, [key]: value }));
        const valid = key === 'jobType' ? value.length !== 0 : isStringValid(value);
        setValidation((prevValidation) => ({ ...prevValidation, [key]: valid }));
    };

    const handleQualificationChange = (_, value) => {
        const selectedQualification = value.trim();
        handleInputData('qualification', selectedQualification);
    };

    const getHelperText = (key) => {
        switch (key) {
            case 'role':
                return !validation.role ? 'Data required' : '';
            case 'qualification':
                return !validation.qualification ? 'Choose Qualification' : '';
            case 'experience':
                return !validation.experience ? 'Data required' : '';
            case 'description':
                return !validation.description ? 'Description required' : '';
            case 'vacancy':
                return !validation.vacancy ? 'Vacancy required' : '';
            case 'jobType':
                return !validation.jobType ? 'Job Type required' : '';
            default:
                return '';
        }
    };

    const handleSubmit = () => {
        const isFormValid = Object.values(validation).every((isValid) => isValid);
        if (isFormValid) {
            handleSetJobForm(jobData);
            setFormNumber(1);
        }
    };

    return (
        <div className={`flex flex-col gap-4 border rounded-lg `}>
            <p className='text-xl font-semibold m-2'>Job Information</p>

            <div className="grid md:grid-cols-2 gap-4 p-2">
                <div className="grid">
                    <InputTextField
                        className='!caret-black'
                        label="Job Role"
                        value={jobData.role}
                        onChange={(e) => handleInputData('role', e.target.value)}
                        error={!validation.role}
                     
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 p-2 ">
                <div className="grid ">
                    <InputTextField
                        className='!caret-black'
                        label="Vacancy"
                        type="number"
                        value={jobData?.vacancy}
                        onChange={(e) => handleInputData('vacancy', e.target.value)}
                        error={!validation.vacancy}
                      
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 p-2">
                <div className="grid !bg-white rounded-md pt-4">
                    <Autocomplete
                        className='!caret-black '
                        options={[...new Set([...(typedQualification ? [typedQualification] : []), ...qualificationOptions])]}
                        getOptionLabel={(option) => option}
                        value={jobData?.qualification || null} // Ensure a valid option or null
                        onChange={handleQualificationChange}
                        onInputChange={(_, value) => setTypedQualification(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Qualification"
                                className='!caret-black'
                                value={typedQualification}
                                error={!validation.qualification}
                                helperText={getHelperText('qualification')} // Corrected to 'helpertext'
                            />
                        )}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 p-2">
                <div className="grid">
                    <InputTextField
                        className='!caret-black'
                        label="Experience"
                        value={jobData?.experience}
                        onChange={(e) => handleInputData('experience', e.target.value)}
                        error={!validation.experience}
                      
                    />
                </div>
            </div>

            <div className="grid gap-4 p-2 pt-5">
                <div className="grid bg-white rounded-md pt-4  max-w-3xl">
                    <TextField
                        className='!caret-black '
                        multiline
                        minRows={5}
                        maxRows={30}
                        label="Description"
                        value={jobData?.description}
                        onChange={(e) => handleInputData('description', e.target.value)}
                        error={!validation.description}
                       
                    />
                </div>
            </div>

            <div className="grid gap-4 p-2 pt-5">
                <div className="grid">
                    <div className="flex flex-wrap gap-4 p-2 items-center">
                        <h1 className={`${!validation.jobType && 'text-red-600'}`}>Select Job Types</h1>
                        {jobTypes?.map((title, index) => (
                            <button
                                key={index}
                                className={`p-1 px-3 flex items-center gap-2 !shadow !rounded-lg ${isDarkMode?'bg-gray-900':'!bg-[#C3B0B7]'}`}
                                onClick={() => handleJobTypeToggle(title)}>
                                {jobData?.jobType && jobData?.jobType?.includes(title) ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
                                {title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-8 flex justify-end">
                <MyButton className='!p-3 !px-5 !text-xl' onClick={handleSubmit}>Save & Next</MyButton>
            </div>
        </div>
    );
};

export default JobInformation;
