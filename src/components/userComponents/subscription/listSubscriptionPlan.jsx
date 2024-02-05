import React, { Fragment, useEffect, useState } from 'react';
import { userGetAllSubscriptionPlans } from '../../../service/subscription';
import Loading from '../../../ui/LoadingPages/Loading';
import UserPlanCard from './userPlanCard';

const ListSubscriptionPlan = () => {
    const [plans, setPlans] = useState([])
    const [load,setLoad] = useState(false)
    const getAllplans = async () => {
        try {
            setLoad(true)
            const res = await userGetAllSubscriptionPlans()
            // console.log(res)
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
    return (
        <>
          <h1 className='font-[700] text-xl py-5'>Subscription Plan</h1>
          {load && <Loading/>}
            {!load && <div className="w-full grid px-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {plans.map((plan) => (<Fragment key={plan._id}>
                    <UserPlanCard plan={plan} />
                </Fragment>))}
            </div>}  
        </>
    );
}

export default ListSubscriptionPlan;
