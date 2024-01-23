import { ApiCall } from "../config_Api";

export const applyJobService = async (data) => {
    try {
        const res = await ApiCall.put('user/apply-job', data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error.response ? error.response.data : "server error";
    }
};
export const validateJobApplied = async (jobId)=>{
    try {
        const res = await ApiCall.get('user/job-applied-validation/'+jobId)
        return res.data
    } catch (error) {
        console.log(error);
        throw error.response ? error.response.data : "server error";
    }
}

export const getAllAppliedJobs = async ()=>{
    try {
        const applications = await ApiCall.get('user/get-all-applied-jobs')
        return applications.data
    } catch (error) {
        console.log(error);
        throw error.response ? error.response.data : "server error";
    }
}