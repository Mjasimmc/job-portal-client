import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { JobCreateContext } from './createJobPostForm';
import MyButton from '../../../ui/elements/myButton';
import { useSelector } from 'react-redux';
import InputTextField from '../../../ui/elements/InputTextField';

const QualificationAndSkillsForm = ({ setFormNumber }) => {
    const { isDarkMode } = useSelector(state => state.theme)
    const { handleSetJobForm, jobForm } = useContext(JobCreateContext);

    // State initialization
    const [qualificationAndSkillsData, setQualificationAndSkillsData] = useState({
        skills: jobForm.skills || [],
        benefits: jobForm.benefits || [],
        requirements: jobForm.requirements || [],
    });

    // Isolated state for input fields
    const [skillInput, setSkillInput] = useState('');
    const [benefitInput, setBenefitInput] = useState('');
    const [requirementInput, setRequirementInput] = useState('');

    // Function to handle input data
    const handleInputData = (key, value) => {
        // Update isolated state based on the input key
        switch (key) {
            case 'skillInput':
                setSkillInput(value);
                break;
            case 'benefitInput':
                setBenefitInput(value);
                break;
            case 'requirementInput':
                setRequirementInput(value);
                break;
            default:
                break;
        }
    };

    const addSkill = () => {
        if (skillInput.trim()) {
            setQualificationAndSkillsData((prevData) => ({
                ...prevData,
                skills: [...new Set([...prevData.skills, skillInput])],
            }));
            setSkillInput(''); // Clear the input field
        }
    };

    // Function to add a benefit
    const addBenefit = () => {
        if (benefitInput.trim()) {
            setQualificationAndSkillsData((prevData) => ({
                ...prevData,
                benefits: [...new Set([...prevData.benefits, benefitInput])],
            }));
            setBenefitInput(''); // Clear the input field
        }
    };

    // Function to add a requirement
    const addRequirement = () => {
        if (requirementInput.trim()) {
            setQualificationAndSkillsData((prevData) => ({
                ...prevData,
                requirements: [...new Set([...prevData.requirements, requirementInput])],
            }));
            setRequirementInput(''); // Clear the input field
        }
    };

    // Function to submit and move to the next step
    const handleSubmit = () => {
        handleSetJobForm(qualificationAndSkillsData);
        setFormNumber(3); // Change to the appropriate form number for the next step
    };

    return (
        <div className={`flex flex-col gap-4 border rounded-lg ${isDarkMode ? "bg-[#ffffff62]" : ''}`}>
            <h1 className='text-center text-2xl font-semibold underline underline-offset-1'>Qualification, Skills, and Benefits</h1>

            <div className="grid gap-4 p-2">
                <p className='text-xl  px-4'>Skills</p>
                <div className="">
                    {qualificationAndSkillsData.skills.map((data, i) => (
                        <p key={data + i}>{data}</p>
                    ))}
                </div>
                <div className="grid lg:grid-cols-2 gap-4 p-2">

                    <div className="flex">
                        <InputTextField
                            className='!caret-black flex-[.7]'
                            label="Skills"
                            value={skillInput}
                            onChange={(e) => handleInputData('skillInput', e.target.value)}

                        />
                        <MyButton className='!shadow-lg !border' onClick={addSkill}>Add Requirement</MyButton>
                    </div>
                </div>
                
            </div>

            <div className=" grid gap-4 p-2">
                <p className='text-xl px-4'>Benefits</p>
                <div className="">
                    {qualificationAndSkillsData.benefits.map((data, i) => (
                        <p key={data + i}>{data}</p>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-4 p-2">
                    <div className="flex">
                        <InputTextField
                            className='!caret-black flex-[.7]'
                            label="Benefits"
                            value={benefitInput}
                            onChange={(e) => handleInputData('benefitInput', e.target.value)}

                        />
                        <MyButton className='!shadow-lg !border min-w-max' onClick={addBenefit}>Add-Benefit</MyButton >
                    </div>
                </div>
            </div>


            <div className=" grid gap-4 p-2">
                <p className='text-xl  px-4'>Requirements</p>
                <div className="">
                    {qualificationAndSkillsData.requirements.map((data, i) => (
                        <p key={data + i}>{data}</p>
                    ))}
                </div>
                <div className="grid lg:grid-cols-2 gap-4 p-2">

                    <div className="flex">
                        <InputTextField
                            className='!caret-black flex-[.7]'
                            label="Requirements"
                            value={requirementInput}
                            onChange={(e) => handleInputData('requirementInput', e.target.value)}

                        />
                        <MyButton className='!shadow-lg !border' onClick={addRequirement}>Add Requirement</MyButton>
                    </div>
                </div>
            </div>

            <div className="p-8 flex justify-end">
                <MyButton className='!p-3 !px-5 !text-xl' onClick={() => setFormNumber(1)}>Prev</MyButton>
                <MyButton className='!p-3 !px-5 !text-xl' onClick={handleSubmit}>Next</MyButton>
            </div>

        </div>
    );
}

export default QualificationAndSkillsForm;
