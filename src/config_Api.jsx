import axios from 'axios'
const prdctn = true
export const BaseURL = prdctn ? 'http://13.60.23.95' : 'http://localhost:4000'

const ApiCall = axios.create({
    baseURL: BaseURL + "/api"
});

ApiCall.interceptors.request.use(config => {
    let token = ''
    if (config.url.startsWith('user')) {
        token = localStorage.getItem("usertoken")
    }
    if (config.url.startsWith('admin')) {
        token = localStorage.getItem("admintoken")
    }
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});


export { ApiCall, };