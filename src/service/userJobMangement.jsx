import { ApiCall } from "../config_Api"

export const createJobPost = async (jobdata) => {
    try {
        const res = await ApiCall.post('user/create-employer-post', jobdata)
        return res.data
    } catch (error) {
        
        throw error.response.data || "server error"
    }
}


export const getAllJobsFromServer = async (search) => {
    try {
        const res = await ApiCall.post('user-un-auth/get-filtered-data', search)
        return res.data
    } catch (error) {
        throw error
    }
}
export const getJobDetailsWithId = async (jobId) => {
    try {
        const res = await ApiCall.get('user-un-auth/get-job-data/' + jobId)
        return res.data
    } catch (error) {
        throw error.response.data ? error.response.data : 'server not connected'
    }
}




export const getFilteredJobData = async (filterParams) => {
    try {
        const res = await ApiCall.post('user-un-auth/get-filtered-data', filterParams);
        return res.data.jobs; 
    } catch (error) {
        throw error.response.data ? error.response.data : 'Server not connected';
    }
};


export const employerGetJobData = async ()=>{
    try {
        const res = await ApiCall.get('user/employer-get-jobs')
        return res.data
    } catch (error) {
        throw error.response.data ? error.response.data : 'Server not connected';
    }
}

export const uploadResume = async (resume)=>{
    try {
        const res = await ApiCall.put('user-un-auth/get-filtered-data', filterParams);
        return res.data; 
    } catch (error) {
        throw error.response.data ? error.response.data : 'Server not connected';
    }
}
