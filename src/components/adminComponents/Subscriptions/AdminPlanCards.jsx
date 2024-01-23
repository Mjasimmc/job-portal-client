import React from 'react';
import MyButton from '../../../ui/elements/myButton';
import { useNavigate } from 'react-router-dom';
import { Edit, ListAlt } from '@mui/icons-material';

const AdminPlanCards = ({ plan }) => {
    const navigate = useNavigate();

    const getDurationDescription = (duration) => {
        const years = Math.floor(duration / 12);
        const months = duration % 12;

        let description = '';

        if (years > 0) {
            description += `${years} ${years === 1 ? 'year' : 'years'}`;
        }

        if (months > 0) {
            if (description !== '') {
                description += ' ';
            }
            description += `${months} ${months === 1 ? 'month' : 'months'}`;
        }

        return description;
    };

    return (
        <div className='p-4 job-card bg-white/5 rounded-lg grid gap-2'>
            <h1 className='text-center text-2xl font-[350] uppercase list-inside p-4'>{plan.name}</h1>
            <h1 className='text-center text-xl font-[400] uppercase list-inside '>${plan.price}</h1>
            <h1 className='text-center text-xl font-[400] uppercase list-inside '>Post Limit : {plan.jobPostLimit}</h1>
            <h1 className='text-center text-md font-[400]  list-inside '>
                Valid Up to {getDurationDescription(plan.duration)}
            </h1>
            <div className="w-full flex gap-4 justify-end">
                <MyButton className=' duration-500 active:scale-50'>
                    <Edit onClick={() => navigate('edit/' + plan._id)}
                    />
                </MyButton>
                <MyButton className=' duration-500 active:scale-50'>
                    <ListAlt onClick={() => navigate('purchase/' + plan._id)}
                    />
                </MyButton>
            </div>

        </div>
    );
};

export default AdminPlanCards;
