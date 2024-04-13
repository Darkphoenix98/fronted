import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getMediaPorId, editarMedia } from '../../services/mediaSerice';
import { getDirectores } from '../../services/directorService';
import { getProductoras } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';
import { getGeneros } from '../../services/generoService';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {

    const { mediaId = '' } = useParams();
    const [media, setMedia] = useState();
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const { serial = '', titulo = '', sinopsis = '', url = '', imagen = '',
        fecha_Estreno = '', director, productora, tipo, genero } = valoresForm;

    const listarDirectores = async () => {
        try {
            const { data } = await getDirectores();
            setDirectores(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarDirectores();
    }, []);

    const listarProductoras = async () => {
        try {
            const { data } = await getProductoras();
            setProductoras(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarProductoras();
    }, []);

    const listarTipos = async () => {
        try {
            const { data } = await getTipos();
            setTipos(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarTipos();
    }, []);

    const listarGeneros = async () => {
        try {
            const { data } = await getGeneros();
            setGeneros(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarGeneros();
    }, []);


    const getMedia = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getMediaPorId(mediaId);
            console.log(data);
            setMedia(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getMedia();
    }, [mediaId]);

    useEffect(() => {
        if (media) {
            // formato adecuado (AAAA-MM-DD)
            const fechaEstrenoFormatted = media.fecha_Estreno ? new Date(media.fecha_Estreno).toISOString().split('T')[0] : '';

            setValoresForm({
                serial: media.serial,
                titulo: media.titulo,
                sinopsis: media.sinopsis,
                url: media.url,
                imagen: media.imagen,
                fecha_Estreno: fechaEstrenoFormatted,
                director: media.director?._id,
                productora: media.productora?._id,
                tipo: media.tipo?._id,
                genero: media.genero?._id
            });
        }
    }, [media]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const media = {
            serial, titulo, sinopsis, url, imagen,
            fecha_Estreno,
            genero: {
                _id: genero
            },
            productora: {
                _id: productora
            },
            tipo: {
                _id: tipo
            },
            director: {
                _id: director
            }
        }
        console.log(media);

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargado...'
            });
            Swal.showLoading();
            const { data } = await editarMedia(mediaId, media);
            Swal.close();
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            Swal.close();
            let mensaje;
            if (error && error.response & error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = "Ocurrió un error, por favor intente de nuevo ";
            }
            Swal.fire('Error', 'Ocurrió un error, por favor verifique los datos', 'error');
        }
    }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className="card">
                <div className='card-header'>
                    <h5 className='card-title'> Detalle Completo</h5>
                </div>

                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={media?.imagen} style={{ maxWidth: '400px', height: 'auto' }} />
                        </div>
                        <div className='col-md-8'>

                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Serial</label>
                                            <input type="text" name='serial'
                                                value={serial}
                                                onChange={e => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Titulo</label>
                                            <input type="text" name='titulo'
                                                required
                                                value={titulo}
                                                onChange={(e) => handleOnChange(e)}
                                                className='form-control' />

                                        </div>
                                    </div>

                                   

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">url</label>
                                            <input type="text" name='url'
                                                required
                                                value={url}
                                                onChange={(e) => handleOnChange(e)}
                                                className='form-control' />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha estreno</label>
                                            <input type="date" name='fecha_Estreno'
                                                required
                                                value={fecha_Estreno}
                                                onChange={(e) => handleOnChange(e)}
                                                className='form-control' />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Director</label>
                                            <select className="form-select"
                                                required
                                                name='director'
                                                value={director}
                                                onChange={(e) => handleOnChange(e)}>
                                                <option value="">--SELECCIONE--</option>
                                                {
                                                    directores.map(({ _id, nombres }) => {
                                                        return <option key={_id} value={_id}>{nombres}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Productora</label>
                                            <select className="form-select"
                                                name='productora'
                                                value={productora}
                                                onChange={(e) => handleOnChange(e)}
                                                required>
                                                <option value="">--SELECCIONE--</option>
                                                {
                                                    productoras.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Tipo</label>
                                            <select className="form-select"
                                                name='tipo'
                                                value={tipo}
                                                required
                                                onChange={(e) => handleOnChange(e)}>
                                                <option value="">--SELECCIONE--</option>
                                                {
                                                    tipos.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Genero</label>
                                            <select className="form-select"
                                                name='genero'
                                                value={genero}
                                                required
                                                onChange={(e) => handleOnChange(e)}>

                                                <option value="">--SELECCIONE--</option>
                                                {
                                                    generos.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Sinopsis</label>
                                            <textarea
                                                name='sinopsis'
                                                required
                                                value={sinopsis}
                                                onChange={(e) => handleOnChange(e)}
                                                className='form-control'   
                                            />
                                        </div>
                                    </div>

                                <div className='row'>
                                    <div className='col'>
                                        <button className="btn btn-success">Guardar</button>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}