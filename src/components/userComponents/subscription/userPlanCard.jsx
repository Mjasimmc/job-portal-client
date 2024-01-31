import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../ui/elements/myButton';

const UserPlanCard = ({ plan }) => {
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
        <div className='p-4 bg-blue-300 rounded-lg grid gap-6'>
            <h1 className='text-center text-2xl font-[850] uppercase list-inside p-4'>{plan.name}</h1>
            <h1 className='text-center text-xl font-[400] uppercase list-inside '>RS :{plan.price}</h1>
            <h1 className='text-center text-xl font-[400] uppercase list-inside '>Post Limit : {plan.jobPostLimit}</h1>
            <h1 className='text-center text-md font-[400]  list-inside '>
                Valid Up to {getDurationDescription(plan.duration)}
            </h1>
            <div className="grid px-10">
                <MyButton onClick={()=>navigate('payment/'+plan._id)} >Purchase {"("}{plan.price} {")"}</MyButton>
            </div>
        </div>
    );
}

export default UserPlanCard;
