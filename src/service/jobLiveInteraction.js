import { ApiCall } from "../config_Api"


export const sendMessageToApplicationId = async (message, applicantId, typeOfMessage) => {
    try {
        const res = await ApiCall.post('user/send-message-applicant', {
            message,
            applicantId,
            typeOfMessage
        })
        return res.data
    } catch (error) {
        throw error.response ? error.response.data : 'server error'
    }
}


export const getAllMessage = async (applicantId) => {
    try {
        const res = await ApiCall.get('user/get-all-messages/'+applicantId)
        return res.data
    } catch (error) {
        throw error.response ? error.response.data : 'server error'
    }
}