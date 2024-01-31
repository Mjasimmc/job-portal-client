import { ApiCall } from "../../config_Api"

const urlPaths = {
    LASTTHIRTYDAYSPAYMENT:'admin/',
    CHARTDATA:'admin/chart-data',
}

export const getLast30DaysPaymentData = async ()=>{
    try {
        const res = await ApiCall.get(urlPaths.LASTTHIRTYDAYSPAYMENT)
        return res.data
    } catch (error) {
        throw error
    }
}

export const getChartData = async ()=>{
    try {
        const res = await ApiCall.get(urlPaths.CHARTDATA)
        return res.data
    } catch (error) {
        throw error
    }
}