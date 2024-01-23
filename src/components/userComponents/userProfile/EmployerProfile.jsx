import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployerDatab } from '../../../service/user';

const EmployerProfile = () => {
    const navigate = useNavigate()
    const [employerData, setEmployerData] = useState({})

    const getEmployerDetails = async () => {
        try {
            const data = await getEmployerDatab()
            setEmployerData(data)

        } catch (error) {
            toast.error('data not found')
        }
    }
    useEffect(() => {
        getEmployerDetails()
    }, [])
    return (<>
        <div className="w-full flex justify-end sticky top-0">
            <Button onClick={() => navigate('edit-company-data')}><Edit /> </Button>
        </div>
        <div className='w-full p-2 grid grid-cols-10 place-items-center gap-4'>
            {employerData && <>

                <p className='col-span-4'>Name </p><p className='col-span-6 '>  {employerData.employer_name} </p>
                <p className='col-span-4'>Position </p><p className='col-span-6'>  {employerData.employer_position} </p>
                <p className='col-span-4 '>Contact </p><p className='col-span-6'>  {employerData.employer_contact} </p>
                <p className='col-span-4'>Company Name </p><p className='col-span-6'> {employerData.company_name} </p>
                <p className='col-span-4'>Company Location </p><p className='col-span-6'>  {employerData.company_location} </p>
                <p className='col-span-4'>Website </p><p className='col-span-6'>  {employerData.company_website} </p>
            </>}
        </div>
    </>
    );
}

export default EmployerProfile;
