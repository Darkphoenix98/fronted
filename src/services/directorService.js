import { axiosInstance } from '../helper/axios-config';

const getDirectores = () => {
    return axiosInstance.get('directores', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearDirector = (data) => {
    return axiosInstance.post('directores', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarDirector = (UpdateDirectorPorId , data) => {
    return axiosInstance.put(`directores/${UpdateDirectorPorId }`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getDirectores, crearDirector, editarDirector
}