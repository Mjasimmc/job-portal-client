import { ApiCall } from "../../config_Api"

export const getAllNotifications = async ()=>{
    try {
        const res = await ApiCall.get('user/get-all-notification')
        return res.data
    } catch (error) {
        throw error
    }
}