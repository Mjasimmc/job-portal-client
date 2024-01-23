import { ApiCall } from "../config_Api"


export const adminCreateSubscription = async (data) => {
    try {
        const {
            name,
            duration,
            cost,
            jobLimit,
        } = data

        if (!name || !duration || !cost || !jobLimit) {
            throw 'Enter Valid Datas'
        }
        await ApiCall.put('admin/create-subscription-plan', data)
        return "Created SuccesFully"
    } catch (error) {
        console.log(error)
        throw error.response ? error.response.data : error
    }
}

export const adminUpdateSubscription = async (data) => {
    try {
        const {
            name,
            duration,
            cost,
            jobLimit,
        } = data

        if (!name || !duration || !cost || !jobLimit) {
            throw 'Enter Valid Datas'
        }
        await ApiCall.put('admin/update-subscription-plan', data)
        return "updated SuccesFully"
    } catch (error) {
        console.log(error)
        throw error.response ? error.response.data : error
    }
}


export const adminGetAllSubscriptionPlanData = async () => {
    try {
        const res = await ApiCall.get('admin/get-all-plans')
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getSubscriptionDataWithId = async (id) => {
    try {
        const res = await ApiCall.get('admin/get-plan-with-id/' + id)
        return res.data
    } catch (error) {
        throw error
    }
}

export const userGetAllSubscriptionPlans = async () => {
    try {
        const res = await ApiCall.get('user/get-all-plan-datas')
        return res.data
    } catch (error) {
        throw error
    }
}

export const userGetPlanDataWithId = async (id) => {
    try {
        const res = await ApiCall.get('user/get-plandata-with-id/' + id)
        return res.data
    } catch (error) {
        throw error
    }
}

export const userGetSelfPlanDetails = async () => {
    try {
        const res = await ApiCall.get('user/get-self-plan-details')
        return res.data
    } catch (error) {
        throw error
    }
}

