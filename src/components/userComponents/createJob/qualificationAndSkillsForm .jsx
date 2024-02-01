import React, { useContext, useState } from 'react';
import { JobCreateContext } from './createJobPostForm';
import MyButton from '../../../ui/elements/myButton';
import { useSelector } from 'react-redux';
import InputTextField from '../../../ui/elements/InputTextField';
import { ArrowRight, Delete, Edit } from '@mui/icons-material';

const QualificationAndSkillsForm = ({ setFormNumber }) => {
    const { isDarkMode } = useSelector(state => state.theme);
    const { handleSetJobForm, jobForm } = useContext(JobCreateContext);

    const [qualificationAndSkillsData, setQualificationAndSkillsData] = useState({
        skills: jobForm.skills || [],
        benefits: jobForm.benefits || [],
        requirements: jobForm.requirements || [],
    });

    const [skillInput, setSkillInput] = useState('');
    const [benefitInput, setBenefitInput] = useState('');
    const [requirementInput, setRequirementInput] = useState('');

    const [temporarySkills, setTemporarySkills] = useState(['Skill A', 'Skill B', 'Skill C']);
    const [temporaryBenefits, setTemporaryBenefits] = useState(['Benefit A', 'Benefit B', 'Benefit C']);

    const handleInputData = (key, value) => {
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
            setSkillInput('');
        }
    };

    const addBenefit = () => {
        if (benefitInput.trim()) {
            setQualificationAndSkillsData((prevData) => ({
                ...prevData,
                benefits: [...new Set([...prevData.benefits, benefitInput])],
            }));
            setBenefitInput('');
        }
    };

    const addRequirement = () => {
        if (requirementInput.trim()) {
            setQualificationAndSkillsData((prevData) => ({
                ...prevData,
                requirements: [...new Set([...prevData.requirements, requirementInput])],
            }));
            setRequirementInput('');
        }
    };

    const removeSkill = (index) => {
        setQualificationAndSkillsData((prevData) => {
            const updatedSkills = [...prevData.skills];
            updatedSkills.splice(index, 1);
            return { ...prevData, skills: updatedSkills };
        });
    };

    const removeBenefit = (index) => {
        setQualificationAndSkillsData((prevData) => {
            const updatedBenefits = [...prevData.benefits];
            updatedBenefits.splice(index, 1);
            return { ...prevData, benefits: updatedBenefits };
        });
    };

    const removeRequirement = (index) => {
        setQualificationAndSkillsData((prevData) => {
            const updatedRequirements = [...prevData.requirements];
            updatedRequirements.splice(index, 1);
            return { ...prevData, requirements: updatedRequirements };
        });
    };

    const handleSubmit = () => {
        handleSetJobForm(qualificationAndSkillsData);
        setFormNumber(3);
    };

    return (
        <div className={`flex flex-col gap-4 border rounded-lg`}>
            <h1 className='text-center text-2xl font-semibold underline underline-offset-1'>Qualification, Skills, and Benefits</h1>

            <div className="grid gap-4 p-2">
                <div className="flex flex-wrap items-center">
                    <p className='text-xl'>Temporary Skills:</p>
                    {temporarySkills.map((tempSkill, index) => (
                        <button className='m-1 border p-2' onClick={() => handleInputData('skillInput', tempSkill)} key={index}>{tempSkill}</button>
                    ))}
                </div>
                <p className='text-xl  px-4'>Skills</p>
                <div className="px-5">
                    {qualificationAndSkillsData.skills.map((data, i) => (
                        <div key={data + i} className="flex items-center gap-4">
                            <ArrowRight />
                            <p>{data}</p>
                            <MyButton className="!ml-2 !text-sm !bg-red-500 !text-white" onClick={() => removeSkill(i)}>
                                <Delete />
                            </MyButton>
                            <MyButton className="!ml-2 !text-sm !bg-red-500 !text-white" onClick={() => {
                                handleInputData('skillInput', data)
                                removeSkill(i)
                            }}>
                                <Edit />
                            </MyButton>
                        </div>
                    ))}
                </div>
                <div className="grid lg:grid-cols-2 gap-4 p-2">
                    <div className="flex flex-col items-start">

                        <InputTextField
                            className='!caret-black flex-[.7]'
                            label="Skills"
                            value={skillInput}
                            onChange={(e) => handleInputData('skillInput', e.target.value)}
                        />
                        <MyButton className='!shadow-lg !border px-4' onClick={addSkill}>
                            Add Skill
                        </MyButton>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 p-2">
                <div className="flex flex-wrap items-center">
                    <p className='text-lg'>Temporary Benefits:</p>
                    {temporaryBenefits.map((tempBenefit, index) => (
                        <p className='m-2 border p-2' onClick={() => handleInputData('benefitInput', tempBenefit)} key={index}>{tempBenefit}</p>
                    ))}
                </div>
                <p className='text-xl px-4'>Benefits</p>
                <div className="">
                    {qualificationAndSkillsData.benefits.map((data, i) => (
                        <div key={data + i} className="flex items-center gap-4">
                            <ArrowRight />
                            <p>{data}</p>
                            <MyButton className="!ml-2 !text-sm !bg-red-500 !text-white" onClick={() => removeBenefit(i)}>
                                <Delete />
                            </MyButton>
                            <MyButton className="!ml-2 !text-sm !bg-red-500 !text-white" onClick={() => {
                                handleInputData('benefitInput', data)
                                removeBenefit(i)
                            }}>
                                <Edit />
                            </MyButton>
                        </div>
                    ))}
                </div>
                <div className="grid lg:grid-cols-2 gap-4 p-2">
                    <div className="flex flex-col items-start">

                        <InputTextField
                            className='!caret-black flex-[.7]'
                            label="Benefits"
                            value={benefitInput}
                            onChange={(e) => handleInputData('benefitInput', e.target.value)}
                        />
                        <MyButton className='!shadow-lg !border min-w-max px-4' onClick={addBenefit}>
                            Add-Benefit
                        </MyButton >
                    </div>
                </div>
            </div>

            {/* ... (similar changes for Requirements) */}

            <div className=" grid gap-4 p-2">
                <p className='text-xl  px-4'>Requirements</p>
                <div className="">
                    {qualificationAndSkillsData.requirements.map((data, i) => (
                        <div key={data + i} className="flex items-center gap-4">
                            <ArrowRight />
                            <p>{data}</p>
                            <MyButton className="!ml-2 !text-sm !bg-red-500 !text-white" onClick={() => removeRequirement(i)}>
                                <Delete />
                            </MyButton>
                            <MyButton className="!ml-2 !text-sm !bg-red-500 !text-white" onClick={() => {
                                handleInputData('requirementInput', data)
                                removeRequirement(i)
                            }}>
                                <Edit />
                            </MyButton>
                        </div>
                    ))}
                </div>
                <div className="grid lg:grid-cols-2 gap-4 p-2">
                    <div className="flex flex-col items-start">
                        <p className='text-xl'>Temporary Requirements:</p>
                        {/* Add temporary requirements here if needed */}
                        <InputTextField
                            className='!caret-black flex-[.7]'
                            label="Requirements"
                            value={requirementInput}
                            onChange={(e) => handleInputData('requirementInput', e.target.value)}
                        />
                        <MyButton className='!shadow-lg !border px-4' onClick={addRequirement}>
                            Add Requirement
                        </MyButton>
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
