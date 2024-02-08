import React, { useEffect, useState } from 'react';
import { userGetSelfPlanDetails } from '../../../service/subscription';
import { useSelector } from 'react-redux';

const UserSubscriptionData = ({showPaymentHistory}) => {
    const user = useSelector(state => state.user);
    const [planDetails, setPlanDetails] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState([])

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
            setPaymentHistory(data.paymentHistory)
            // console.log(data.paymentHistory)
            setPlanDetails(data.plan);
        } catch (error) {
            // console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    const isPlanExpired = planDetails?.expiryDate && new Date(planDetails.expiryDate) < new Date();

    return (<>
        <div className="max-w-[30rem] w-full min-h-[10rem] text-lg border m-3 flex flex-col gap-3 p-4">
            <div className="w-full flex gap-4">
                <p>User</p> <p>:</p> <p>{user.name}</p>
            </div>
            <div className="w-full flex gap-4">
                <p>Job-Limit</p> <p>:</p> <p>{planDetails?.jobLimit || 0}</p>
            </div>
            {planDetails?.expiryDate && <div className="w-full flex gap-4">
                <p>Expiry Date</p> <p>:</p>  <p>{formatDateToDDMMYYYY(planDetails.expiryDate)}</p>
            </div>}


            {planDetails && !isPlanExpired ? (
                <p className='text-[green] text-lg'>Current Plan is Active</p>
            ) : (
                <p className='text-[red] text-lg'>No Current Plan</p>
            )}
        </div>
       {showPaymentHistory && !!paymentHistory.length && <div className="w-full ">
            <h1 className='font-[700] text-xl'>Payment History</h1>
            <div className="w-full flex p-4 pt-2 overflow-x-auto overflow-y-hidden gap-4">

                {paymentHistory.map((payment) => (<div key={payment._id} className="h-full border border-blue-700 px-5 grid gap-3    py-10">

                    <h1 className='text-center text-2xl font-[850] uppercase list-inside p-4'>{payment?.plan.name}</h1>
                    <h1 className='text-center text-xl font-[400] uppercase list-inside '>Post Limit : {payment?.plan.jobPostLimit}</h1>
                    <h1 className='text-center text-xl font-[400] uppercase list-inside underline underline-offset-8 p-4 '>paid : {payment.amount}</h1>
                    <h1 className='text-center text-xs   font-[400]     '>Paid At <br /> {formatDateToDDMMYYYY(payment.updatedAt)}</h1>

                </div>))}

            </div>
        </div>}
    </>

    );
};

export default UserSubscriptionData;
