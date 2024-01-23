import { ApiCall } from "../../config_Api"
const ApiUrls = {
    getAllUsers: 'admin/get-all-users',
    createUser: 'admin/create-user',
};


export const getAllUsersData = async () => {
    try {
        const res = await ApiCall.get(ApiUrls.getAllUsers);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : 'network error';
    }
}

export const createNewUserFromAdmin = async (name, email, phone, password) => {
    try {
        const res = await ApiCall.post(ApiUrls.createUser, { name, email, phone, password });
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : 'network error';
    }
}