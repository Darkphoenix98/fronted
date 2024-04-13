import { axiosInstance } from '../helper/axios-config';

const getMedia = () => {
    return axiosInstance.get('media', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearMedia = (data) => {
    return axiosInstance.post('media', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarMedia = (updateMediaPorId, data) => {
    return axiosInstance.put(`media/${updateMediaPorId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const getMediaPorId = (mediaId) => {
    return axiosInstance.get(`media/${mediaId}` ,{  
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getMedia, crearMedia, editarMedia, getMediaPorId
}