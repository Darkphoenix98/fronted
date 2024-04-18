import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'localhost:4001/'
  //  baseURL:'https://movies-5eef.onrender.com/'
});

export {
    axiosInstance,
}