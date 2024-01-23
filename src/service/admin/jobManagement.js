import { ApiCall } from "../../config_Api";

export const getAdminFilteredData  = async (filterParams) => {
    try {
        const res = await ApiCall.post('admin/get-all-filtered-jobs', filterParams);
        return res.data; 
    } catch (error) {
        console.log(error)
        throw error.response.data ? error.response.data : 'Server not connected';
    }
};