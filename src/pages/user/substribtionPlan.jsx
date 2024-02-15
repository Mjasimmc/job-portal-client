import { ArrowRight, Star } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';
import { userGetAllSubscriptionPlans } from '../../service/subscription';
import UserPlanCard from '../../components/userComponents/subscription/userPlanCard';
import { useSelector } from 'react-redux';
import UserSubscriptionData from '../../components/userComponents/subscription/userSubscriptionData';
import Loading from '../../ui/LoadingPages/Loading';
import ListSubscriptionPlan from '../../components/userComponents/subscription/listSubscriptionPlan';

const SubstribtionPlan = () => {
    // const [plans, setPlans] = useState([])
    // const [load,setLoad] = useState(false)
    // const getAllplans = async () => {
    //     try {
    //         setLoad(true)
    //         const res = await userGetAllSubscriptionPlans()
    //         // console.log(res)
    //         setPlans(res)
    //     } catch (error) {
    //         console.log(error)
    //     }finally{
    //         setLoad(false)
    //     }
    // }
    // useEffect(() => {
    //     getAllplans()
    // }, [])
    return (<>
        <div className='w-full max-md:px-2 md:px-10 font-[350] pb-20'>
            <UserSubscriptionData showPaymentHistory={true} />
            <ListSubscriptionPlan />

        </div>
    </>
    );
}

export default SubstribtionPlan;
