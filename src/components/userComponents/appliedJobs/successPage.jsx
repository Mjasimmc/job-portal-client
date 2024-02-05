import React from 'react';
import MyButton from '../../../ui/elements/myButton';
import { useNavigate } from 'react-router-dom';

const SuccessPageJobApplied = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full flex items-center justify-center flex-1 flex-col'>
            <div className="flex flex-col items-center py-10">
                {/* <Done className='text-[#4c8118] !text-5xl' /> */}
                <h1 className='text-[#4c8118]'>SuccessFully Applied Job</h1>
                <MyButton onClick={() => navigate('/job-status/applied')}>Manage</MyButton>
            </div>

        </div>
    );
}

export default SuccessPageJobApplied;
