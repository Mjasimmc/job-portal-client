import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getEmployeeData } from '../../../service/user';
import MyButton from '../../../ui/elements/myButton';
import { getAllEmployeeResumes } from '../../../service/resumeMangement';
import { BaseURL } from '../../../config_Api';

const EmployeeProfile = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [resumes, setResumeData] = useState([])
    const navigate = useNavigate();

    const getEmployeesData = async () => {
        try {
            const res = await getEmployeeData();
            const resumeData = await getAllEmployeeResumes()
            console.log(resumeData)
            setResumeData(resumeData)
            setEmployeeData(res.employee);
            setEducation(res.education);
            setExperience(res.experience);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    useEffect(() => {
        getEmployeesData();
    }, []);

    return (
        <>
            <div className="w-full grid p-2 gap-2">
                {employeeData && (
                    <>
                        <div className="w-full flex justify-between items-center">
                            <p className='text-xl font-bold '>Personal Information</p>
                            <Button onClick={() => navigate('edit-profile-data')}><Edit /> </Button>
                        </div>
                        <div className="p-2 grid grid-cols-2">
                            <p>Full Name</p><p>{employeeData.full_name}</p>
                            <p>Email</p><p>{employeeData.email}</p>
                            <p>Phone</p><p>{employeeData.phone}</p>
                            <div className="col-span-2 flex gap-4">
                                {employeeData.gitHub && <a href={employeeData.gitHub}>GitHub : {employeeData.gitHub} </a>}
                                {employeeData.linkedIn && <a href={employeeData.linkedIn}>LinkedIn : {employeeData.linkedIn}</a>}
                            </div>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <p className='text-xl font-bold '>Resumes</p>
                            <MyButton onClick={() => navigate('resume-list')}><Add /> </MyButton>
                        </div>
                        <div className="p-2 grid gap-4 md:grid-cols-2">
                            {resumes.map((resume) => (
                                <div key={resume._id} className='border p-4'>
                                    <p className='col-span-3'>{resume.__filename} </p>
                                    <div className="w-full flex gap-4">

                                        <MyButton onClick={() => {
                                            window.open(BaseURL + "/uploads/" + resume.file_id, '_blank');
                                        }}>View</MyButton>

                                        <MyButton className="col-span-1" >Delete</MyButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <p className='text-xl font-bold '>Education</p>
                            <MyButton onClick={() => navigate('edit-education-data')}><Add /> </MyButton>
                        </div>
                        <div className="p-2 grid gap-4 md:grid-cols-2">
                            {education.map((edu) => (
                                <div key={edu._id} className='border px-2'>
                                    <p className='text-xs m-1 font-semibold'>{`${new Date(edu.graduationStartDate).getFullYear()} to ${edu.graduationEndDate ? new Date(edu.graduationEndDate).getFullYear() : 'Present'
                                        }`}</p>
                                    <p className='text-lg'>{edu.course}</p>
                                    <p className='text-md'>{edu.college}</p>
                                    <MyButton onClick={() => navigate('edit-profile-data')} >Edit<Edit /> </MyButton>
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <p className='text-xl font-bold '>Experience</p>
                            <MyButton onClick={() => navigate('edit-experience-data')}><Add /> </MyButton>
                        </div>
                        <div className="p-2 grid gap-4 md:grid-cols-2">
                            {experience.map((exp) => (
                                <div key={exp._id} className='border  px-2'>
                                    <p className='text-xs m-1 font-semibold'>{`${new Date(exp.employmentStartDate).getFullYear()} to ${exp.employmentEndDate ? new Date(exp.employmentEndDate).getFullYear() : 'Present'
                                        }`}</p>
                                    <p className='text-lg'>{exp.position}</p>
                                    <p className='text-md'>{exp.company}</p>
                                    <MyButton onClick={() => navigate('edit-profile-data')} className='px-2'>Edit<Edit /> </MyButton>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {!employeeData && (
                    <div className="w-ful">
                        <MyButton onClick={() => navigate('edit-profile-data')}>
                            Create Employee Profile
                        </MyButton>
                    </div>
                )}
            </div>
        </>
    );
};

export default EmployeeProfile;
