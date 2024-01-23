import React, { createContext, useEffect, useState } from 'react';
import JobInformation from './JobInformation';
import CompanyDataForm from './companyDataForm';
import QualificationAndSkillsForm from './qualificationAndSkillsForm ';
import JobViewSubmit from './JobViewSubmit';

export const JobCreateContext = createContext(null);

const CreateJobPostForm = () => {
    const [formNumber, setFormNumber] = useState(0);
    const [jobForm, setJobForm] = useState(() => {
        const storedData = localStorage.getItem('jobForm');
        return storedData ? JSON.parse(storedData) : {
                role: '',
                jobType: [],
                qualification: '',
                experience: '',
                description: '',
                companyName: '',
                salary: '',
                location: '',
                deadline: '',
                contactEmail: '',
                skills: [],
                benefits: [],
                requirements: [],
                vacancy:''
        };
    });

    const handleSetJobForm = (data) => {
        const updatedForm = { ...jobForm, ...data };
        setJobForm(updatedForm);
        // Save data to localStorage
        localStorage.setItem('jobForm', JSON.stringify(updatedForm));
    };

    useEffect(() => {
        return () => {
            localStorage.removeItem('jobForm');
        };
    }, []);
    return (
        <div className='w-full'>
            <JobCreateContext.Provider value={{ handleSetJobForm, jobForm }}>
                {formNumber === 0 && <JobInformation {...{ formNumber, setFormNumber }} />}
                {formNumber === 1 && <CompanyDataForm {...{ formNumber, setFormNumber }} />}
                {formNumber === 2 && <QualificationAndSkillsForm {...{ formNumber, setFormNumber }} />}
                {formNumber === 3 && <JobViewSubmit {...{ formNumber, setFormNumber }} />}
            </JobCreateContext.Provider>
        </div>
    );
};

export default CreateJobPostForm;
