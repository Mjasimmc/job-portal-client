import { ApiCall } from "../config_Api"

export const getAllApplicantsOfJobWithJobId  = async (id)=>{
    try {
        const res = await ApiCall.get('user/get-all-applicants/'+id)
        return res.data
    } catch (error) {
        throw error
    }
}

export const getApplicantDataWithId = async (id)=>{
    try {
        console.log(id)
        const res = await ApiCall.get('user/get-appicant-data/'+id)
        console.log(res)
        return res.data
    } catch (error) {
        throw error
    }
}