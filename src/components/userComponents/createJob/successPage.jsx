import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../ui/elements/myButton';
import { Done } from '@mui/icons-material';

const SuccessPageJobPost = () => {

    const navigate = useNavigate()
    return (
        <div className='w-full flex items-center justify-center flex-1 flex-col'>
            <div className="flex flex-col items-center">
                <Done className='text-[#4c8118] !text-5xl' />
                <h1 className='text-[#4c8118]'>SuccessFully Created Job Post</h1>
                <MyButton onClick={() => navigate('/job/control')}>Manage</MyButton>
            </div>

        </div>
    );
}

export default SuccessPageJobPost;
