import React, { useEffect, useState } from 'react';
import { userGetSelfPlanDetails } from '../../../service/subscription';
import { useSelector } from 'react-redux';

const UserSubscriptionData = () => {
    const user = useSelector(state => state.user);
    const [planDetails, setPlanDetails] = useState(null);

    const formatDateToDDMMYYYY = (planDate) => {
        const date = new Date(planDate);
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
            const data = await userGetSelfPlanDetails();
          
            setPlanDetails(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const isPlanExpired = planDetails?.expiryDate && new Date(planDetails.expiryDate) < new Date();

    return (
        <div className="max-w-[30rem] w-full min-h-[10rem] text-lg  flex flex-col gap-3 p-4">
          
            <div className="w-full flex justify-around">
                <p>User</p> <p>:</p> <p>{user.name}</p>
            </div>
            <div className="w-full flex justify-around">
                <p>Job-Limit</p> <p>:</p> <p>{planDetails?.jobLimit || 0}</p>
            </div>
            {planDetails?.expiryDate &&<div className="w-full flex justify-around">
                <p>Expiry Date</p> <p>:</p>  <p>{formatDateToDDMMYYYY(planDetails.expiryDate)}</p>
            </div>}
            
           
            {planDetails && !isPlanExpired ? (
                <p>Current Plan is Active</p>
            ) : (
                <p>No Current Plan</p>
            )}
        </div>
    );
};

export default UserSubscriptionData;
