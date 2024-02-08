import { ApiCall } from "../../config_Api"

export const getUserDataForAdmin = async (userId)=>{
    try {
        const res = await ApiCall.get('admin/get-user/'+userId)
    } catch (error) {
        throw error 
    }
}