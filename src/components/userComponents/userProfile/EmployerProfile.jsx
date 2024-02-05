import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployerDatab } from '../../../service/user';
import Loading from '../../../ui/LoadingPages/Loading';
import MyButton from '../../../ui/elements/myButton';

const EmployerProfile = () => {
    const navigate = useNavigate()
    const [employerData, setEmployerData] = useState(null)
    const [load, setLoad] = useState(false)

    const getEmployerDetails = async () => {
        try {
            setLoad(true)
            const data = await getEmployerDatab()
            setEmployerData(data)

        } catch (error) {
            toast.error('data not found')
        } finally {
            setLoad(false)
        }
    }
    useEffect(() => {
        getEmployerDetails()
    }, [])


    if(load){
        return (
            <Loading />
        )
    }
    return (<>

        <div className="w-full flex justify-end sticky top-0">
            <Button onClick={() => navigate('edit-company-data')}><Edit /> </Button>
        </div>
        {!load && <div className='w-full p-2 grid grid-cols-10 place-items-center gap-4'>
            {employerData && <>

                <p className='col-span-4'>Name </p><p className='col-span-6 '>  {employerData.employer_name} </p>
                <p className='col-span-4'>Position </p><p className='col-span-6'>  {employerData.employer_position} </p>
                <p className='col-span-4 '>Contact </p><p className='col-span-6'>  {employerData.employer_contact} </p>
                <p className='col-span-4'>Company Name </p><p className='col-span-6'> {employerData.company_name} </p>
                <p className='col-span-4'>Company Location </p><p className='col-span-6'>  {employerData.company_location} </p>
                <p className='col-span-4'>Website </p><p className='col-span-6'>  {employerData.company_website} </p>
            </>}
        </div>}
        {!load && !employerData && (
            <div className="w-ful">
                <MyButton onClick={() => navigate('edit-company-data')}>
                    Create Employee Profile
                </MyButton>
            </div>
        )}
    </>
    );
}

export default EmployerProfile;
