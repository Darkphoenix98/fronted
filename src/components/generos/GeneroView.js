import React, { useState, useEffect } from 'react'
import { getGeneros, crearGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const GeneroView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [generos, setGeneros] = useState([]);
  const { nombre= '', estado = '', descripcion ='' } = valoresForm; 

  const listarGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'   
      });
      const resp = await getGeneros();
      setGeneros(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarGeneros();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }

  const handleCrearGenero = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearGenero(valoresForm);
      setValoresForm({ nombre: '', estado: '' , descripcion: ''});
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
    
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearGenero(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Estado</label>
              <select required name='estado' value={estado} className="form-select"
                onChange={(e) => handleOnChange(e)} >
                <option selected>--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Descripcion</label>
              <input required name='descripcion' value={descripcion} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>

          

        </div>
        <button className="btn btn-success">Guardar</button>
      </form>
      <br></br>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            

          </tr>
        </thead>
        <tbody>
          {
            generos.length > 0 && generos.map((genero, index) => {
              return <tr>
                <th scope='row'> {index + 1}</th>
                <td>{genero.nombre}</td>
                <td>{genero.estado}</td>
                <td>{genero.descripcion}</td>
                <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(genero.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              

              </tr>
            })
          }
        </tbody>
      </table>

    </div>
  )
}



