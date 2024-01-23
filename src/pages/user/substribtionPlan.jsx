import { ArrowRight, Star } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';
import { userGetAllSubscriptionPlans } from '../../service/subscription';
import UserPlanCard from '../../components/userComponents/subscription/userPlanCard';
import { useSelector } from 'react-redux';
import UserSubscriptionData from '../../components/userComponents/subscription/userSubscriptionData';

const SubstribtionPlan = () => {
    const user = useSelector(state => state.user)
    const [plans, setPlans] = useState([])
    const getAllplans = async () => {
        try {
            const res = await userGetAllSubscriptionPlans()
            console.log(res)
            setPlans(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllplans()
        console.log(user)
    }, [])
    return (<>
        <div className='w-full max-md:px-2 md:px-10 font-[350]'>
            <UserSubscriptionData />
            <h1>Subscription Plan</h1>
            <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {plans.map((plan) => (<Fragment key={plan._id}>
                    <UserPlanCard plan={plan} />
                </Fragment>))}
            </div>

        </div>
    </>
    );
}

export default SubstribtionPlan;
