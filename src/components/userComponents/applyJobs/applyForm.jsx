import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, CssBaseline, Paper, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { getJobDetailsWithId } from '../../../service/userJobMangement';
import { useNavigate, useParams } from 'react-router-dom';
import { UserMainContext } from '../../../store/contexts/userContext';
import { getEmployeeData } from '../../../service/user';
import { applyJobService, validateJobApplied } from '../../../service/userApplyJob';
import { getAllEmployeeResumes } from '../../../service/resumeMangement';
import MyButton from '../../../ui/elements/myButton';
import { BaseURL } from '../../../config_Api';
import SuccessPageJobApplied from '../appliedJobs/successPage';
import Loading from '../../../ui/LoadingPages/Loading';

const ApplyForm = () => {
    const navigate = useNavigate();
    const [jobApplied, setJobApplied] = useState(false)
    const [jobApplySucess, setJobApplySucess] = useState(false)
    const [loadPage, setLoadPage] = useState(false)
    const { jobId } = useParams();
    const {
        setPageNotFound,
        setServerError
    } = useContext(UserMainContext);
    const [employeeData, setEmployeeData] = useState(null);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [resumeList, setResumeList] = useState([])
    const [applicationData, setApplicationData] = useState({
        coverLetter: '',
        selectedResumeId: '',
    });
    const getEmployeesData = async () => {
        try {

        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const handleFieldChange = (field, value) => {
        setApplicationData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const getValidatedData = () => {
        let val = {
            user: employeeData._id,
            ...(applicationData && { ...applicationData }),
            jobId
        };

        if (!applicationData.coverLetter.trim()) {
            toast.error("Cover letter is required", toast_config);
            val = false;
        }

        // Check if employee data fields are empty
        if (!employeeData.full_name.trim() || !employeeData.email.trim() || !employeeData.phone.trim()) {
            toast.error("Employee information is incomplete", toast_config);
            val = false;
        }

        return val;
    };

    const handleSubmit = async () => {
        try {
            const application = getValidatedData();
            if (!application) throw '';
            const res = await applyJobService(application);
            setJobApplySucess(true)
            toast.success("Applied successfully", toast_config);

        } catch (error) {
            toast.error("Error occurred on submitting", toast_config);
        }
    };

    const getJobData = async () => {
        try {
            setLoadPage(true)
            const job = await getJobDetailsWithId(jobId);
            if (!job) {
                setLoadPage(false)
                return setPageNotFound(true)
            };
            const applied = await validateJobApplied(jobId);
            if (applied) {
                setJobApplied(true)
                toast.error('Already Applied')
            } else {
                const res = await getEmployeeData();
                const resumes = await getAllEmployeeResumes()
                setResumeList(resumes)
                setEmployeeData(res.employee);
                setEducation(res.education);
                setExperience(res.experience);
            }
        } catch (error) {
            return setServerError(true);
        } finally {
            setLoadPage(false)
        }
    };

    useEffect(() => {
        getJobData();
    }, []);

    return (
        <>
            {!employeeData && <Loading />}
            {employeeData && <Container className='font-[300]' component="main" maxWidth="sm">
                <CssBaseline />
                {jobApplySucess && <SuccessPageJobApplied />}
                {jobApplied && <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Already applied
                    </Typography>
                </Paper>}
                {!jobApplied && !jobApplySucess && <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Apply for Job
                    </Typography>
                    {employeeData && (
                        <>
                            <div className="p-2 grid max-w-max grid-cols-8 ">
                                <p className='col-span-3'>Full Name</p><p>:</p> <p className='col-span-4'>{employeeData.full_name}</p>
                                <p className='col-span-3'>Email</p><p>:</p> <p className='col-span-4'>{employeeData.email}</p>
                                <p className='col-span-3'>Phone</p><p>:</p> <p className='col-span-4'>{employeeData.phone}</p>
                            </div>
                            {!!education.length && <p> <strong> Education</strong></p>}
                            <div className="p-2 grid gap-4 md:grid-cols-2">
                                {education.map((edu) => (
                                    <div key={edu._id} className='border p-3 rounded-lg'>
                                        <p className='text-xs m-1 font-semibold'>{`${new Date(edu.graduationStartDate).getFullYear()} to ${edu.graduationEndDate ? new Date(edu.graduationEndDate).getFullYear() : 'Present'
                                            }`}</p>
                                        <p className='text-lg'>{edu.course}</p>
                                        <p className='text-md'>{edu.college}</p>
                                    </div>
                                ))}
                            </div>
                            {!!experience.length && <p> <strong> Experience</strong></p>}
                            <div className="p-2 grid gap-4 md:grid-cols-2">
                                {experience.map((exp) => (
                                    <div key={exp._id} className='border p-3 rounded-lg'>
                                        <p className='text-xs m-1 font-semibold'>{`${new Date(exp.employmentStartDate).getFullYear()} to ${exp.employmentEndDate ? new Date(exp.employmentEndDate).getFullYear() : 'Present'
                                            }`}</p>
                                        <p className='text-lg'>{exp.position}</p>
                                        <p className='text-md'>{exp.company}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div>
                        <div>
                            <TextField
                                label="Cover Letter"
                                multiline
                                minRows={10}
                                maxRows={20}
                                variant="outlined"
                                fullWidth
                                value={applicationData.coverLetter}
                                className='!caret-black'
                                onChange={(e) => handleFieldChange('coverLetter', e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-3">
                            <p className='text-lg'><strong>Choose CV</strong> </p>
                            <select
                                className="w-full p-2 border rounded"
                                onChange={(e) => handleFieldChange('selectedResumeId', e.target.value)}
                                value={applicationData.selectedResumeId}
                            >
                                <option value="" disabled>Select a Resume</option>
                                {resumeList.map((resume) => (
                                    <option key={resume._id} value={resume.file_id}>{resume.__filename}</option>
                                ))}
                            </select>

                            <div className="w-full flex flex-wrap gap-4">
                                {applicationData.selectedResumeId &&
                                    <MyButton className='border' onClick={() => {
                                        window.open(BaseURL + "/uploads/" + applicationData.selectedResumeId, '_blank');
                                    }}>View Selected Resume</MyButton>
                                }
                                <MyButton onClick={() => navigate('/profile/resume-list')}>Add New Resume</MyButton>
                            </div>
                        </div>
                        <div className='pt-5'>
                            <MyButton onClick={handleSubmit}>
                                Submit Application
                            </MyButton>
                        </div>
                    </div>
                </Paper>}
            </Container>}
        </>
    );
};

export default ApplyForm;
