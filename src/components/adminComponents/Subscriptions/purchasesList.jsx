import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { getAllPlanPurchases } from '../../../service/admin/planDatas';

const PurchasesList = () => {
    const { plan_id } = useParams();

    const [planPurchases, setPlanPurchases] = useState([])
    const getPurchaseHistory = async () => {
        try {
            const plans = await getAllPlanPurchases(plan_id)
            console.log(plans)
            setPlanPurchases(plans)
        } catch (error) {
            toast.error('error on fetching purchase history', toast_config)
        }
    }
    const ViewDate = (date) => {
        const dateConvert = new Date(date);
        return dateConvert.toLocaleDateString();
    };

    useEffect(() => {
        getPurchaseHistory()
    }, []);
    return (
        <>
            <div className="w-full overflow-auto">
                <div className='w-full grid gap-2 p-4 min-w-[25rem]'>
                    {planPurchases.map((purchase, i) => (<Fragment key={purchase._id}>
                        <div className="w-full flex flex-wrap justify-between items-center border p-2">
                            <div className="flex gap-4">
                                <p>{i + 1}</p>
                                <p> {purchase.user.name} </p>
                            </div>
                            <p className='uppercase'>{purchase.plan.name} </p>
                            <div className="grid">
                                <p>RS:{purchase.amount} </p>
                                <p></p>
                                <p className='text-xs'>{ViewDate(purchase.updatedAt)} </p>
                            </div>
                        </div>
                    </Fragment>))}
                </div>
            </div>
        </>
    );
}

export default PurchasesList;
