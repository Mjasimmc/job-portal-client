import { ApiCall } from "../../config_Api"

export const getAllPlanPurchases = async (plan)=>{
    try {
        const res = await ApiCall.get('admin/get-all-plan-purchases/'+plan)
        return res.data
    } catch (error) {
        throw error
    }
}