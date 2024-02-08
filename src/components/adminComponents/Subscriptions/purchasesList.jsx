import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { getAllPlanPurchases } from '../../../service/admin/planDatas';
import Loading from '../../../ui/LoadingPages/Loading';

const PurchasesList = () => {
    const { plan_id } = useParams();

    const [planPurchases, setPlanPurchases] = useState([])
    const [load,setLoad] = useState(false)
    const getPurchaseHistory = async () => {
        try {
            setLoad(true)
            const plans = await getAllPlanPurchases(plan_id)
            // console.log(plans)
            setLoad(false)
            setPlanPurchases(plans)
        } catch (error) {
            toast.error('error on fetching purchase history', toast_config)
            setLoad(false)
        }
    }
    const ViewDate = (date) => {
        const dateConvert = new Date(date);
        return dateConvert.toLocaleDateString();
    };

    useEffect(() => {
        getPurchaseHistory()
    }, []);

    if(load){
        return <Loading />
    }
    return (
        <>
            <div className="w-full overflow-auto">
                <div className='w-full grid gap-2 p-4 min-w-[25rem]'>

                    {planPurchases.length === 0 && <p className='w-full text-[2rem]'>No Purahcase Found</p>}
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
