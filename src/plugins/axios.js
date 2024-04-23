import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL_API
axios.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.request.use((config) => {
    if (localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
    }
    return config
}, (error) => {
    console.log('Error in axios interceptor request', error)
    return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
    if (response.data?.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
    }
    return response;
}, (error) => {
    console.log('Error in axios interceptor response', error)
    return Promise.reject(error.message);
});

export default axios