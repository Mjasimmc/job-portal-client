import { ApiCall } from "../../config_Api"

export const getApplicantProfileData = async (applicantId)=>{
    try {
        const res = await ApiCall.get('user//'+applicantId)
    } catch (error) {
        throw error
    }
}