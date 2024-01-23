import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { adminUpdateSubscription, getSubscriptionDataWithId } from '../../../service/subscription';
import { useSelector } from 'react-redux';
// import { adminCreateSubscription } from '../../../service/subscription';
const EditPlan = () => {
    const navigate = useNavigate();
    const { plan_id } = useParams();
    const {isDarkMode} = useSelector(state => state.theme)
    const [planData, setPlanData] = useState({
        name: '',
        duration: '',
        cost: '',
        jobLimit: '',
    });
    const getPlanDatas = async () => {
        try {
            const planDetails = await getSubscriptionDataWithId(plan_id)
            const {
                price,
                jobPostLimit,
            } = planDetails
            setPlanData({
                ...planDetails, cost: price, jobLimit: jobPostLimit
            })
            console.log(planDetails)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDataInput = (value, type) => {
        setPlanData((prevData) => ({
            ...prevData,
            [type]: value,
        }));
    };

    const submitSubscriptionPlan = async () => {
        try {
            const res = await adminUpdateSubscription(planData)
            navigate(-1);
            toast.success(res, toast_config);
        } catch (error) {
            toast.error(error, toast_config);
        }
    };
    useEffect(() => {
        getPlanDatas()
    }, [])

    return (
        <div className="p-5">
            <div className={`max-w-[25rem] grid gap-2 border p-4 rounded-md ${isDarkMode ?'bg-white/50':'bg-black/50'}`}>
                <h1 className="text-2xl font-[300] uppercase p-3 text-center ">Create new subscription plan</h1>

                <div className="grid">
                    <TextField
                        label="Plan Name"
                        fullWidth
                        value={planData.name}
                        onChange={(e) => handleDataInput(e.target.value, 'name')}
                    />
                </div>

                <div className="grid">
                    <TextField
                        label="Duration (in months)"
                        fullWidth
                        type="number"
                        value={planData.duration}
                        onChange={(e) => handleDataInput(e.target.value, 'duration')}
                    />
                </div>

                <div className="grid">
                    <TextField
                        label="Cost"
                        fullWidth
                        type="number"
                        value={planData.cost}
                        onChange={(e) => handleDataInput(e.target.value, 'cost')}
                    />
                </div>

                <div className="grid">
                    <TextField
                        label="Job Limit"
                        fullWidth
                        type="number"
                        value={planData.jobLimit}
                        onChange={(e) => handleDataInput(e.target.value, 'jobLimit')}
                    />
                </div>
                <div className="flex justify-center">
                    <Button className="!text-lg !p-2 !bg-[#d1d1d1]" onClick={submitSubscriptionPlan}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditPlan;
