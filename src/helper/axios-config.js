import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:4001/'
    baseURL: 'https://movies-lm2x.onrender.com/'
});

export {
    axiosInstance,
}