import axios from 'axios';

const axiosInstance = axios.create({
    
    baseURL: 'https://movies-5eef.onrender.com/'
});

export {
    axiosInstance,
}