import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { validate } from '../../../config/validations';
import { toast } from 'react-toastify'
import { toast_config } from '../../../config/constants';
import { createEmployerProfile, getEmployerDatab } from '../../../service/user';
import InputTextField from '../../../ui/elements/InputTextField';
import MyButton from '../../../ui/elements/myButton';
import LocationInputField from '../../../config/googleLocation';
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
            setEmployerData((prevData) => { return { ...prevData, [type]: { text: value, valid: value.length > 1 } } })
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


    useEffect(() => {
        console.log(employerData)
    }, [employerData])



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
                        <InputTextField
                            labelShow={true}
                            label={"company name"}
                            value={employerData.company_name.text}
                            error={!employerData.company_name.valid}
                            onChange={(e) => {
                                handleInput(e.target.value, 'company_name')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Company Location : </p>

                    <div className="md:!col-span-6 !caret-black grid">
                        <LocationInputField
                            labelShow={true}
                            value={employerData.company_location.text}
                            setValue={(value) => {
                                handleInput(value, 'company_location')
                            }}

                        />
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Website : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <InputTextField
                            label={"company_website "}
                            labelShow={true}
                            value={employerData.company_website.text}
                            error={!employerData.company_website.valid}

                            onChange={(e) => {
                                handleInput(e.target.value, 'company_website')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Email : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <InputTextField
                            label={"company_email "}
                            labelShow={true}
                            value={employerData.company_email.text}
                            error={!employerData.company_email.valid}
                            onChange={(e) => {
                                handleInput(e.target.value, 'company_email')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                    </div>
                </div>
                <div className="max-md:w-full md:w-8/12 shadows max-md:flex max-md:flex-col md:grid md:grid-cols-10 gap-3 p-4">
                    <div className="col-span-10 text-xl font-semibold text-center">
                        Employer Details
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Full Name : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <InputTextField
                            label={"employer_name "}
                            labelShow={true}
                            value={employerData.employer_name.text}
                            error={!employerData.employer_name.valid}
                            onChange={(e) => {
                                handleInput(e.target.value, 'employer_name')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                    </div>
                    <p className=' md:col-span-4 flex items-center'> Position At Company : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <InputTextField
                            label={"Employer Position"}
                            labelShow={true}
                            value={employerData.employer_position.text}
                            error={!employerData.employer_position.valid}
                            onChange={(e) => {
                                handleInput(e.target.value, 'employer_position')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                    </div>
                    <p className=' md:col-span-4 flex items-center'>Contact : </p>
                    <div className="md:!col-span-6 !caret-black grid">
                        <InputTextField
                            label={"employer_contact"}
                            labelShow={true}
                            error={!employerData.employer_contact.valid}
                            value={employerData.employer_contact.text}
                            onChange={(e) => {
                                handleInput(e.target.value, 'employer_contact')
                            }}
                            className='md:!col-span-6 !caret-black' type='text' />
                    </div>
                </div>
                <div className="p-4">
                    <MyButton className='!bg-[#e0e0e0] !p-3 !text-xl' onClick={submitEditEmployerProfile}>submit</MyButton>
                </div>
            </div>
        </>
    );
}

export default EditEmployerProfile;
