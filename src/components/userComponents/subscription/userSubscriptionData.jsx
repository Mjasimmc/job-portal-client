import React, { useEffect, useState } from 'react';
import { userGetSelfPlanDetails } from '../../../service/subscription';
import { useSelector } from 'react-redux';

const UserSubscriptionData = () => {
    const user = useSelector(state => state.user)
    const [planDetails, setPlanDetails] = useState(null)
    const formatDateToDDMMYYYY = (planDate) => {
        const date = new Date(planDate)
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
      
        // Add leading zeros if needed
        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;
      
        return `${day}-${month}-${year}`;
      };
    const getData = async () => {
        try {
            const data = await userGetSelfPlanDetails()
            console.log(data)
            setPlanDetails(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="w-full min-h-[10rem] ">
            <p>user : {user.name}</p>
            <p>Job-Limit : {planDetails?.jobLimit}</p>
            <p>Job-Limit : {formatDateToDDMMYYYY(planDetails?.expiryDate)}</p>
        </div>
    );
}

export default UserSubscriptionData;
