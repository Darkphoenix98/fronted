import { axiosInstance } from '../helper/axios-config';

const getProductoras = () => {
    return axiosInstance.get('productoras', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearProductora = (data) => {
    return axiosInstance.post('productoras', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarProductora = (UpdateProductoraPorId, data) => {
    return axiosInstance.put(`productoras/${UpdateProductoraPorId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getProductoras, crearProductora, editarProductora
}