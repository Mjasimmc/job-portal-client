import axios from 'axios'

export const BaseURL = 'http://localhost:4000'

const ApiCall = axios.create({
    baseURL: BaseURL + "/api"
});

ApiCall.interceptors.request.use(config => {
    let token =''
    if (config.url.startsWith('user')) {
        token = localStorage.getItem("usertoken")
    }
    if(token){
        config.headers.Authorization = token;
    }
    return config;
});


export { ApiCall, };