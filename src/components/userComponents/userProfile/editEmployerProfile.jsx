import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { validate } from '../../../config/validations';
import { toast } from 'react-toastify'
import { toast_config } from '../../../config/constants';
import { createEmployerProfile, getEmployerDatab } from '../../../service/user';
const EditEmployerProfile = () => {
    const navigate = useNavigate()

    const [employerData, setEmployerData] = useState({
        company_name: { text: '', valid: true },
        company_location: { text: '', valid: true },
        company_website: { text: '', valid: true },
        company_email: { text: '', valid: true },

        employer_name: { text: '', valid: true },
        employer_position: { text: '', valid: true },
        employer_contact: { text: '', valid: true }
    })


    const handleInput = (value, type) => {
        if (type === 'employer_contact') {
            setEmployerData({ ...employerData, [type]: { text: value, valid: validate('phone', value) } })
        } else if (type === 'company_email') {
            setEmployerData({ ...employerData, [type]: { text: value, valid: validate('email', value) } })
        } else if (type === 'company_website') {
            setEmployerData({ ...employerData, [type]: { text: value, valid: validate('url', value) } })
        } else {
            setEmployerData({ ...employerData, [type]: { text: value, valid: value.length > 1 } })
        }
    }
    const validateData = (data) => {
        let status = true
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key].text;
                const isValid = data[key].valid;
                if (value === '' || !isValid) {
                    data[key].valid = false;
                    status = false
                }
            }
        }
        setEmployerData({ ...data })
        return status

    }
    const submitEditEmployerProfile = async () => {
        try {
            if (!validateData(employerData)) return toast.error("check entered data", toast_config)
            const company_name = employerData['company_name'].text
            const company_location = employerData['company_location'].text
            const company_website = employerData['company_website'].text
            const company_email = employerData['company_email'].text
            const employer_name = employerData['employer_name'].text
            const employer_position = employerData['employer_position'].text
            const employer_contact = employerData['employer_contact'].text

            const updatedData = await createEmployerProfile(company_name,
                company_location,
                company_website,
                company_email,
                employer_name,
                employer_position,
                employer_contact)
            navigate("/profile")
            toast.success("employer updated")
        } catch (error) {
        }
    }
    const getEmployerDetails = async () => {
        try {
            const data = await getEmployerDatab()

            let employer = employerData
            for (const key in data) {
                employer = { ...employer, [key]: { text: data[key], valid: true } }
            }
            setEmployerData(employer)

        } catch (error) {
            toast.error('data not found')
        }
    }
    useEffect(() => {
        getEmployerDetails()
    }, [])



    return (
        <>
            <div className="flex justify-end w-full">
                <Button className='!text-black !bg-red-50 !m-3' onClick={() => navigate("/profile")}>Back to Profile</Button>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
                <div className="max-md:w-full md:w-8/12 shadows ">
                    <h1 className='p-3 text-2xl font-medium px-6' >Edit Employer Profile</h1>
                </div>

                <div className="max-md:w-full md:w-8/12 shadows max-md:flex max-md:flex-col md:grid md:grid-cols-10 gap-3 p-4">
                    <div className="col-span-10 text-xl font-semibold text-center">
                        Company Details
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Company Name : </p>

                    <div className="md:!col-span-6 !caret-black grid">
                        <TextField
                            value={employerData.company_name.text}
                            error={!employerData.company_name.valid}
                            onChange={(e) => {
                                handleInput(e.target.value, 'company_name')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                        {!employerData.company_name.valid && <p className='text-xs text-[red]'>Input Company Name</p>}
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Company Location : </p>

                    <div className="md:!col-span-6 !caret-black grid">
                        <TextField
                            value={employerData.company_location.text}
                            error={!employerData.company_location.valid}
                            onChange={(e) => {
                                handleInput(e.target.value, 'company_location')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                        {!employerData.company_location.valid && <p className='text-xs text-[red]'>Input Company Location</p>}
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Website : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <TextField
                            value={employerData.company_website.text}
                            error={!employerData.company_website.valid}

                            onChange={(e) => {
                                handleInput(e.target.value, 'company_website')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                        {!employerData.company_website.valid && <p className='text-xs text-[red]'>Input Valid URL</p>}
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Email : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <TextField
                            value={employerData.company_email.text}
                            error={!employerData.company_email.valid}
                            onChange={(e) => {
                                handleInput(e.target.value, 'company_email')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                        {!employerData.company_email.valid && <p className='text-xs text-[red]'>Input Valid Company Mail</p>}
                    </div>
                </div>
                <div className="max-md:w-full md:w-8/12 shadows max-md:flex max-md:flex-col md:grid md:grid-cols-10 gap-3 p-4">
                    <div className="col-span-10 text-xl font-semibold text-center">
                        Employer Details
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Full Name : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <TextField
                            value={employerData.employer_name.text}
                            error={!employerData.employer_name.valid}
                            onChange={(e) => {
                                handleInput(e.target.value, 'employer_name')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                        {!employerData.employer_name.valid && <p className='text-xs text-[red]'>Input Valid Name</p>}
                    </div>
                    <p className=' md:col-span-4 flex items-center'> Position At Company : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <TextField
                            value={employerData.employer_position.text}
                            error={!employerData.employer_position.valid}
                            onChange={(e) => {
                                handleInput(e.target.value, 'employer_position')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                        {!employerData.employer_position.valid && <p className='text-xs text-[red]'>Input Your Position on Company</p>}
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Contact : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <TextField
                            error={!employerData.employer_contact.valid}
                            value={employerData.employer_contact.text}
                            onChange={(e) => {
                                handleInput(e.target.value, 'employer_contact')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                        {!employerData.employer_contact.valid && <p className='text-xs text-[red]'>Input Valid Number</p>}
                    </div>
                </div>
                <div className="p-4">
                    <Button className='!bg-[#e0e0e0] !p-3 !text-xl' onClick={submitEditEmployerProfile}>submit</Button>
                </div>
            </div>
        </>
    );
}

export default EditEmployerProfile;
