import React, { Fragment, useEffect, useState } from 'react';
import MyButton from '../../ui/elements/myButton';
import { useNavigate } from 'react-router-dom';
import { adminGetAllSubscriptionPlanData } from '../../service/subscription';
import AdminPlanCards from '../../components/adminComponents/Subscriptions/AdminPlanCards';
import Loading from '../../ui/LoadingPages/Loading';

const SubscriptionPlan = () => {
    const navigate = useNavigate()
    const [plans, setPlans] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoad(true)
                const res = await adminGetAllSubscriptionPlanData();
                console.log('Original plans:', res);
                const sortedPlans = res.sort((a, b) => b.price - a.price);
                console.log('Sorted plans:', sortedPlans);
                setPlans(sortedPlans);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoad(false)
            }
        };

        fetchData();
    }, [])
    return (
        <div className='w-full grid p-5 px-10  '>
            <div className="flex justify-end">
                <MyButton onClick={() => navigate('create')}>Create</MyButton>
            </div>
            {load && <Loading />}
            {!plans.length && !load && <p className='text-3xl'>No Subscription plan found</p>}
            {!!plans.length  && !load && <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {plans
                    .sort((a, b) => b.price - a.price)
                    .map((plan) => (<Fragment key={plan._id}>
                        <AdminPlanCards plan={plan} />
                    </Fragment>))}
            </div>}
        </div>
    );
}

export default SubscriptionPlan;
