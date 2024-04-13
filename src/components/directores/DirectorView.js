import React, { useState, useEffect } from 'react'
import { getDirectores, crearDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const DirectorView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [directores, setDirectores] = useState([]);
  const { nombres = '', estado = '' } = valoresForm; 

  const listarDirectores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'   
      });
      const resp = await getDirectores();
      setDirectores(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarDirectores();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }

  const handleCrearDirector = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearDirector(valoresForm);
      setValoresForm({ nombres: '', estado: '' });
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
    
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearDirector(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Nombres</label>
              <input required name='nombres' value={nombres} type="text" className="form-control"
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

        </div>
        <button className="btn btn-success">Guardar</button>
      </form>
      <br></br>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">nombres</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            

          </tr>
        </thead>
        <tbody>
          {
            directores.length > 0 && directores.map((director, index) => {
              return <tr>
                <th scope='row'> {index + 1}</th>
                <td>{director.nombres}</td>
                <td>{director.estado}</td>
                <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(director.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              

              </tr>
            })
          }
        </tbody>
      </table>

    </div>
  )
}

