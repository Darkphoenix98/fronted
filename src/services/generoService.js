import { axiosInstance } from '../helper/axios-config';

const getGeneros = () => {
    return axiosInstance.get('generos', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearGenero = (data) => {
    return axiosInstance.post('generos', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarGenero = (UpdateGeneroPorId , data) => {
    return axiosInstance.put(`generos/${UpdateGeneroPorId }`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getGeneros, crearGenero, editarGenero
}