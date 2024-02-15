import React, { useEffect, useState } from 'react';
import { getUserEmployeeForAdmin } from '../../../service/admin/user';
import { useParams } from 'react-router-dom';
import Loading from '../../../ui/LoadingPages/Loading';

const UserEmployee = () => {
    const [employeeData, setEmployeeData] = useState(null)
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [load, setLoad] = useState(false)
    const { userId } = useParams()
    const getEmployeeData = async () => {
        if (!userId) return
        setLoad(true)
        try {
            const data = await getUserEmployeeForAdmin(userId)
            console.log(data)
            setEmployeeData(data.employee)
            setEducation(data.education);
            setExperience(data.experience);
        } catch (error) {
            console.log(error)
        } finally {
            setLoad(false)
        }
    }

    useEffect(() => {
        getEmployeeData()
    }, [])
    if (load) {
        return <Loading />
    }
    if (!employeeData) {
        return <h1>No Data Found</h1>
    }
    return (<>
        <div className="p-2 grid grid-cols-2">
            <p>Full Name</p><p>{employeeData.full_name}</p>
            <p>Email</p><p>{employeeData.email}</p>
            <p>Phone</p><p>{employeeData.phone}</p>
            <div className="col-span-2 flex gap-4">
                {employeeData.gitHub && <a href={employeeData.gitHub}>GitHub : {employeeData.gitHub} </a>}
                {employeeData.linkedIn && <a href={employeeData.linkedIn}>LinkedIn : {employeeData.linkedIn}</a>}
            </div>
        </div>
        {education.length > 0 && <div className="p-2 grid gap-4 md:grid-cols-2">
            {education.map((edu) => (
                <div key={edu._id} className='border px-2'>
                    <p className='text-xs m-1 font-semibold'>{`${new Date(edu.graduationStartDate).getFullYear()} to ${edu.graduationEndDate ? new Date(edu.graduationEndDate).getFullYear() : 'Present'
                        }`}</p>
                    <p className='text-lg'>{edu.course}</p>
                    <p className='text-md'>{edu.college}</p>
                    <MyButton onClick={() => navigate('edit-profile-data')} >Edit<Edit /> </MyButton>
                </div>
            ))}
        </div>}
        {experience.length > 0 && <div className="p-2 grid gap-4 md:grid-cols-2">
            {experience.map((exp) => (
                <div key={exp._id} className='border  px-2'>
                    <p className='text-xs m-1 font-semibold'>{`${new Date(exp.employmentStartDate).getFullYear()} to ${exp.employmentEndDate ? new Date(exp.employmentEndDate).getFullYear() : 'Present'
                        }`}</p>
                    <p className='text-lg'>{exp.position}</p>
                    <p className='text-md'>{exp.company}</p>
                    <MyButton onClick={() => navigate('edit-profile-data')} className='px-2'>Edit<Edit /> </MyButton>
                </div>
            ))}
        </div>}

    </>
    );
}

export default UserEmployee;
