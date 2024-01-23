import { ApiCall } from "../config_Api"

export const userAuthenticate = async () => {
    try {
        const res =  await ApiCall.get('user/auth-user')
        return res.data
    } catch (error) {
        throw  error.response ?  error.response.data : "server error"
    }
}


export const createEmployerProfile = async (
    company_name,
    company_location,
    company_website,
    company_email,
    employer_name,
    employer_position,
    employer_contact
) => {
    try {
        const res = await ApiCall.post('user/create-employer-profile', {
            company_name,
            company_location,
            company_website,
            company_email,
            employer_name,
            employer_position,
            employer_contact
        })
        return res.data
    } catch (error) {
        throw  error.response ?  error.response.data : "server error"
    }
}

export const getEmployerDatab = async () => {
    try {
        const res = await ApiCall.get('user/get-employer-data')
        return res.data
    } catch (error) {
        throw  error.response ?  error.response.data : "server error"
    }
}

export const getEmployeeData = async () => {
    try {
        const res = await ApiCall.get('user/get-employee-profile')
        return res.data
    } catch (error) {
        throw  error.response ?  error.response.data : "server error"
    }
}

export const updateEmployeeProfile = async ({full_name, email, phone, linkedIn, gitHub}) => {
    try {
        const res = await ApiCall.post('user/update-employee-profile', { full_name, email, phone, linkedIn, gitHub })
        return res.data
    } catch (error) {
        throw  error.response ?  error.response.data : "server error"
    }
}

export const addEducation = async (data) => {
    try {
        const res = await ApiCall.post('user/add-education', data)
        return res.data
    } catch (error) {
        
        throw  error.response ?  error.response.data : "server error"
    }
}

export const addExperience = async (data) => {
    try {
        const res = await ApiCall.post('user/add-experience', data)
        return res.data
    } catch (error) {
        
        throw  error.response ?  error.response.data : "server error"
    }
}