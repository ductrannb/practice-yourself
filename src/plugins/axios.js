import axios from "axios"
import store from "@/plugins/vuex.js"
import Swal from "sweetalert2";
import constants from "@/Utils/constants.js";
import router from "@/router/index.js";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL_API
axios.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.request.use((config) => {
    store.state.isLoading = true
    if (localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
    }
    return config
}, (error) => {
    console.log('Error in axios interceptor request', error)
    return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
    setTimeout(() => {
        store.state.isLoading = false
    }, 300)
    if (response.data?.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
    }
    if (response.data?.message) {
        Swal.fire({
            icon: 'success',
            title: 'Thông báo',
            text: response.data.message || '',
        });
    }
    return response;
}, (error) => {
    setTimeout(() => {
        store.state.isLoading = false
    }, 300)
    if (error.config.url !== 'me') {
        // handle error axios
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: error.response.data.message || 'Lỗi hệ thống',
        });
        if (error.response.status === constants.RESPONSES.HTTP_UNAUTHORIZED) {
            router.push({name: 'login'})
        }
    }
    return Promise.reject(error.message);
});

export default axios