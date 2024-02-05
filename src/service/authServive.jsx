import { ApiCall } from "../config_Api"

export const userRegister = async (data) => {
    try {
        let sendData = data
        for (const value in sendData) {
            sendData[value] = data[value].data
        }
        const res = await ApiCall.post('auth/register-user', sendData)
        return res
    } catch (error) {
        throw error.response.data || "server error"
    }
}

export const validateOtp = async (otp, otp_id) => {
    try {
        const res = await ApiCall.post('auth/validate-otp', { otp, otp_id })
        return res.data
    } catch (error) {
        throw error.response.data || "server error"
    }
}

export const userLogin = async (data) => {
    try {
        let sendData = data
        for (const value in sendData) {
            sendData[value] = data[value].data
        }
        const res = await ApiCall.post('auth/login-user', sendData)
        if (res.status === 203) {
            return { mes: res.data, status: false }
        }
        return { mes: res.data, status: true }
    } catch (error) {
        throw error.response.data || "server error"
    }
}

export const createOtpToValidateEmail = async (email) => {
    try {

        const res = await ApiCall.post('auth/get-new-otp', { email })
        return res.data
    } catch (error) {

        throw error.response.data || "server error"
    }
}

export const adminLoginService = async (email, password) => {
    try {
        const res = await ApiCall.post('auth/login-admin', { email, password })
        return res.data
    } catch (error) {
        throw error.response.data || "server error"
    }
}
export const userChangePassword = async (email, password) => {
    try {
        const res = await ApiCall.put('auth/change-pass', { email, password })
        return res.data
    } catch (error) {
        throw error.response.data || "server error"
    }
}

export const userLoginGoogleAuthFirebase = async (email) => {
    try {
        const res = await ApiCall.post('auth/google-login', { email })
        return res.data
    } catch (error) {
        throw error.response.data || "server error"
    }
}

export const resendOtp = async (otpId) => {
    try {
        const res = await ApiCall.post('auth/resend-otp', { otpId })
        return res.data
    } catch (error) {
        throw error?.response?.data || "server error"
    }
}

export const validateOtpPage = async (otpId) => {
    try {
        const res = await ApiCall.get('auth/validate-otp-id/' + otpId)
        return res.data
    } catch (error) {
        throw error?.response?.data || "server error"
    }
}