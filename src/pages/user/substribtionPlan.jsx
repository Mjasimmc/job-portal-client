import { ArrowRight, Star } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';
import { userGetAllSubscriptionPlans } from '../../service/subscription';
import UserPlanCard from '../../components/userComponents/subscription/userPlanCard';
import { useSelector } from 'react-redux';
import UserSubscriptionData from '../../components/userComponents/subscription/userSubscriptionData';
import Loading from '../../ui/LoadingPages/Loading';

const SubstribtionPlan = () => {
    const [plans, setPlans] = useState([])
    const [load,setLoad] = useState(false)
    const getAllplans = async () => {
        try {
            setLoad(true)
            const res = await userGetAllSubscriptionPlans()
            console.log(res)
            setPlans(res)
        } catch (error) {
            console.log(error)
        }finally{
            setLoad(false)
        }
    }
    useEffect(() => {
        getAllplans()
    }, [])
    return (<>
        <div className='w-full max-md:px-2 md:px-10 font-[350]'>
            <UserSubscriptionData />
            <h1 className='p-5 text-lg'>Subscription Plan</h1>
            {load && <Loading/>}
            {!load && <div className="w-full grid px-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {plans.map((plan) => (<Fragment key={plan._id}>
                    <UserPlanCard plan={plan} />
                </Fragment>))}
            </div>}

        </div>
    </>
    );
}

export default SubstribtionPlan;
