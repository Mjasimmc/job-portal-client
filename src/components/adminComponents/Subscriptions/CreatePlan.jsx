import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { adminCreateSubscription } from '../../../service/subscription';
import InputTextField from '../../../ui/elements/InputTextField';
// import { createSubscriptionPlan } from '../../../service/subscriptionPlan'; 

const CreateSubscriptionPlan = () => {
    const navigate = useNavigate();

    const [planData, setPlanData] = useState({
        name: '',
        duration: '',
        cost: '',
        jobLimit: '',
    });

    const handleDataInput = (value, type) => {
        setPlanData((prevData) => ({
            ...prevData,
            [type]: value,
        }));
    };

    const submitSubscriptionPlan = async () => {
        try {
            const res = await adminCreateSubscription(planData)
            navigate(-1);
            toast.success(res, toast_config);
        } catch (error) {
            toast.error(error, toast_config);
        }
    };

    return (
        <div className="p-5">
            <div className="max-w-[25rem] grid gap-2">
                <h1 className="text-2xl font-[300] uppercase p-3 text-center ">Create new subscription plan</h1>

                <div className="grid">
                    <InputTextField
                        label="Plan Name"
                    
                        value={planData.name}
                        onChange={(e) => handleDataInput(e.target.value, 'name')}
                    />
                </div>

                <div className="grid">
                    <InputTextField
                        label="Duration (in months)"
                        
                        type="number"
                        value={planData.duration}
                        onChange={(e) => handleDataInput(e.target.value, 'duration')}
                    />
                </div>

                <div className="grid">
                    <InputTextField
                        label="Cost"
                        
                        type="number"
                        value={planData.cost}
                        onChange={(e) => handleDataInput(e.target.value, 'cost')}
                    />
                </div>

                <div className="grid">
                    <InputTextField
                        label="Job Limit"
                        
                        type="number"
                        value={planData.jobLimit}
                        onChange={(e) => handleDataInput(e.target.value, 'jobLimit')}
                    />
                </div>

                <div className="flex justify-center">
                    <Button className="!text-lg !p-2 !bg-[#d1d1d1]" onClick={submitSubscriptionPlan}>
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateSubscriptionPlan;
