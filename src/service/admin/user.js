import { ApiCall } from "../../config_Api"

export const getUserDataForAdmin = async (userId)=>{
    try {
        const res = await ApiCall.get('admin/get-user/'+userId)
        return res.data
    } catch (error) {
        throw error 
    }
}


export const getUserEmployeeForAdmin = async (userId)=>{
    try {
        const res = await ApiCall.get('admin/get-user-employee/'+userId)
        return res.data
    } catch (error) {
        throw error 
    }
}

export const blockUser = async (userId)=>{
    try {
        const res = await ApiCall.get('admin/block-user/'+userId)
        return res.data
    } catch (error) {
        throw error 
    }
}
export const unBlockUser = async (userId)=>{
    try {
        const res = await ApiCall.get('admin/unblock-user/'+userId)
        return res.data
    } catch (error) {
        throw error 
    }
}