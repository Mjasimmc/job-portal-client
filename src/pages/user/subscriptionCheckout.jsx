import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userGetPlanDataWithId } from '../../service/subscription';
import MyButton from '../../ui/elements/myButton';
import CheckoutPage from '../../components/userComponents/subscription/checkoutPage';
const SubscriptionCheckout = () => {
    const { planId } = useParams()
    const [plan, setPlan] = useState(null)
    const getPlanData = async () => {
        try {
            const planData = await userGetPlanDataWithId(planId)
            console.log(planData)
            setPlan(planData)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPlanData()
    }, [])
    return (
        <div className="w-full  flex flex-col gap-5 max-w-[30rem] py-4 px-2 md:px-10 ">
            <h1 className=' text-4xl font-[850] uppercase list-inside p-2'>{plan?.name}</h1>
            <h1 className=' text-2xl font-[400] uppercase list-inside '>Price : ${plan?.price}</h1>
            <h1 className=' text-2xl font-[400] uppercase list-inside '>Job Limit : {plan?.jobPostLimit} <span className='text-sm'>count</span></h1>
            <h1 className=' text-2xl font-[400] uppercase list-inside '>Duration : {plan?.duration} <span className='text-sm'>months</span> </h1>

            <CheckoutPage plan={plan} />
        </div>
    );
}

export default SubscriptionCheckout;
