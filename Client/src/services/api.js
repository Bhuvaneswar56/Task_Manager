import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'  
});


instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')

    
    config.headers.Authorization = `Bearer ${token}`

    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(
    function (response) {
        return response;
    }, 
    function (error) {

        console.log("API Error:", error)

        if (error.message === 'Network Error') {
            window.location.href = '/down'
        }
        else if (error.response && error.response.status === 401) {
            localStorage.clear()
            window.location.href = '/login'
        }

        return Promise.reject(error);
    }
);

export default instance;