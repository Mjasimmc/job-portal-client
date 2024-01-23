import React, { Fragment, useEffect, useState } from 'react';
import MyButton from '../../ui/elements/myButton';
import { useNavigate } from 'react-router-dom';
import { adminGetAllSubscriptionPlanData } from '../../service/subscription';
import AdminPlanCards from '../../components/adminComponents/Subscriptions/AdminPlanCards';

const SubscriptionPlan = () => {
    const navigate = useNavigate()
    const [plans, setPlans] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await adminGetAllSubscriptionPlanData();
                console.log('Original plans:', res);
                const sortedPlans = res.sort((a, b) => b.price - a.price);
                console.log('Sorted plans:', sortedPlans);
                setPlans(sortedPlans);
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };

        fetchData();
    }, [])
    return (
        <div className='w-full grid px-10 '>
            <div className="flex justify-end">
                <MyButton onClick={() => navigate('create')}>Create</MyButton>
            </div>
            <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {plans
                    .sort((a, b) => b.price - a.price)
                    .map((plan) => (<Fragment key={plan._id}>
                        <AdminPlanCards plan={plan} />
                    </Fragment>))}
            </div>
        </div>
    );
}

export default SubscriptionPlan;
