import { ApiCall } from "../config_Api"

export const createCheckoutSession = async (product) => {
    try {
        console.log(product)
        const res = await ApiCall.post('user/create-checkout-session', product)
        return res.data
    } catch (error) {
        throw error
    }
}

export const createRazorpayInstanceFromServer = async (amount,planId) => {
    try {
        const res = await ApiCall.post('user/create-razorpay-instance', { amount,planId })
        return res.data
    } catch (error) {
        throw error
    }
}

export const savePaymentWithPaymentId = async (order) => {
    try {
        const res = await ApiCall.post('user/credit-uploading-validate-payment',order)
        return res.data
    } catch (error) {
        throw error
    }
}