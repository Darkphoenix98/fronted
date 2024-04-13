import React, { useState, useEffect } from 'react'
import { getTipos, crearTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [tipos, setTipos] = useState([]);
  const { nombre = '', descripcion = '' } = valoresForm; 

  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'   
      });
      const resp = await getTipos();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarTipos();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }

  const handleCrearTipo = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearTipo(valoresForm);
      setValoresForm({ nombre: '', descripcion: '' });
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
    
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearTipo(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>

          <div className='col'>
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
      <table className="table table-dark table-stripedd">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">nombres</th>
            <th scope="col">Descripcion</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            

          </tr>
        </thead>
        <tbody>
          {
            tipos.length > 0 && tipos.map((tipo, index) => {
              return <tr>
                <th scope='row'> {index + 1}</th>
                <td>{tipo.nombre}</td>
                <td>{tipo.descripcion}</td>
                <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(tipo.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              

              </tr>
            })
          }
        </tbody>
      </table>

    </div>
  )
}


