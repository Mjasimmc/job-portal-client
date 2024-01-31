import { ApiCall } from "../../config_Api"

export const saveToSavedList = async (jobId) => {
    try {
        const res = await ApiCall.get('user/save-jobs/' + jobId)
        return res.data
    } catch (error) {
        throw error
    }
}

export const removeFromSavedList = async (jobId) => {
    try {
        const res = await ApiCall.get('user/remove-jobs/' + jobId)
        return res.data
    } catch (error) {
        throw error
    }
}