import { axiosInstance } from '../helper/axios-config';

const getTipos = () => {
    return axiosInstance.get('tipos', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearTipo = (data) => {
    return axiosInstance.post('tipos', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarTipo = (UpdateTipoPorId, data) => {
    return axiosInstance.put(`tipos/${UpdateTipoPorId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getTipos, crearTipo, editarTipo
}